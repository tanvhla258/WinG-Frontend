import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { UserData } from '../types/model'
import { URL } from '../constant/constant'
import { setUser } from '../features/user/userSlice';
// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${URL}/user/` }),
  endpoints: (builder) => ({
    getUser: builder.query<UserData, null>({
      query() {
        return {
          url: 'me',
          credentials: 'include',
        };
      },
  }),
})
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUserQuery } = userApi