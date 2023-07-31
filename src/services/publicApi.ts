import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { URL } from '../constant/constant'
import { setUser } from '../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux'; // Add this import for accessing the Redux state
import type { RootState } from '../redux/store'; // Import the RootState type if it's defined in your Redux store file

// Define a service using a base URL and expected endpoints

export const publicApi = createApi({
  reducerPath: 'publicApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${URL}/public/`, 
 }),
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query({username,id} : {username:string | null,id:string | null}) {
        if (!username && id)
            return {
              url: `user?id=${id}`,
            };
        if (username && !id)
            return {
              url: `user?username=${username}`,
            };
        return {
          url: `user?username=${username}&id=${id}`,
        };
      },
  }),
})
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUserProfileQuery } = publicApi