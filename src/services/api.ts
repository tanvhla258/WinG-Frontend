import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials} from "../features/auth/authSlice"
import type { RootState } from '../redux/store'; // Import the RootState type if it's defined in your Redux store file
import { URL } from '../constant/constant';
import { logout } from '../features/user/userSlice';
const baseQuery = fetchBaseQuery({
    baseUrl: URL,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.accessToken
        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    if (result?.error?.originalStatus === 401) {
        console.log('sending refresh token')
        // send refresh token to get new access token 
        const refreshResult = await baseQuery('/refresh', api, extraOptions)
        console.log(refreshResult)
        if (refreshResult?.data) { 
            // const token = api.getState().auth.
            // store the new token 
            // api.dispatch(setCredentials({ }))
            // retry the original query with new access token 
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logout())
        }
    }

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})