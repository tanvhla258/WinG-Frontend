import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials} from "../features/auth/authSlice"
import type { RootState } from '../redux/store'; // Import the RootState type if it's defined in your Redux store file
import { URL } from '../constant/constant';
import { logout, setUser } from '../features/user/userSlice';
import { clearToken } from '../features/auth/authSlice';
import { useGetUserQuery } from './userApi';
const baseQuery = fetchBaseQuery({
    baseUrl: URL,
    prepareHeaders: (headers, { getState }) => {
        const token =  (getState() as RootState).auth.accessToken
        
        if (token) {
            headers.set("Token", `Bearer ${token}`)
        }
        return headers
    }
})
const baseQueryRefresh = fetchBaseQuery({
    baseUrl: URL,
    prepareHeaders: (headers, { getState }) => {
        const token =  (getState() as RootState).auth.refreshToken
        
        if (token) {
            headers.set("Token", `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    // console.log(result)
    if (result?.error?.status === 'FETCH_ERROR') {
        // send refresh token to get new access token 
        const refreshResult = await baseQueryRefresh('/auth/token/refresh', api, extraOptions)
        if (refreshResult?.data) { 
            const token = api.getState().auth
            // store the new token 
            api.dispatch(setCredentials({...token,accessToken:refreshResult.data.detail}))
            localStorage.setItem("accessToken",refreshResult.data.detail)

            // retry the original query with new access token 
            result = await baseQuery(args, api, extraOptions)
        } else {
            console.log("token timeout")
            api.dispatch(logout())
            api.dispatch(clearToken());
            localStorage.clear();
            window.location.href="./login"
        }
    }

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})