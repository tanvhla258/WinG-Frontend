import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { URL } from '../constant/constant'
import { setUser } from '../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux'; // Add this import for accessing the Redux state
import type { RootState } from '../redux/store'; // Import the RootState type if it's defined in your Redux store file

// Define a service using a base URL and expected endpoints

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${URL}/user/`, 
  prepareHeaders: (headers,{ getState}) => {
    // Add the token to the Authorization header if available
    const token =  (getState() as RootState).auth.accessToken
   
    // Add the token to the Authorization header if available
    if (token) {
      headers.set('Token', `Bearer ${token}`);
    }
    return headers;
  },
 }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query() {
        return {
          url: 'me',
        };
      },
   
    async onQueryStarted(args, { dispatch, queryFulfilled }) {
      try {
        const { data } = await queryFulfilled;
        dispatch(setUser({avatarURL:data.avatarURL,id:data.id,fullName:data.full_name,username:data.user_name}));
      } catch (error) {}
    },
  }),
})
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUserQuery } = userApi