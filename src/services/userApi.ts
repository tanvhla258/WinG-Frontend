import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { URL } from '../constant/constant'
import { setUser } from '../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux'; // Add this import for accessing the Redux state
import type { RootState } from '../redux/store'; // Import the RootState type if it's defined in your Redux store file
import { apiSlice } from './api';

// Define a service using a base URL and expected endpoints

export const userApi = apiSlice.injectEndpoints({
//   reducerPath: 'userApi',
//   baseQuery: fetchBaseQuery({ baseUrl: `${URL}/user/`, 
//   prepareHeaders: (headers,{ getState}) => {
//     // Add the token to the Authorization header if available
//     const token =  (getState() as RootState).auth.accessToken
   
//     // Add the token to the Authorization header if available
//     if (token) {
//       headers.set('Token', `Bearer ${token}`);
//     }
//     return headers;
//   },
//  }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query() {
        return {
          url: '/user/me',
        };
      },
   
    async onQueryStarted(args, { dispatch, queryFulfilled }) {
      try {
        const { data } = await queryFulfilled;
        dispatch(setUser({avatarURL:data.avatarURL,id:data.id,fullName:data.full_name,username:data.user_name}));
      } catch (error) {}
    },
    
    
  }),
  editUser: builder.mutation({
    query({user,avatar}) {
      return {
        url: `/user/me?user_name=${user.username}&full_name=${user.fullName}`,
        method:'PUT',
        body:avatar
      };
    },
 
  async onQueryStarted(args, { dispatch, queryFulfilled }) {
    try {
      const { data } = await queryFulfilled;
      dispatch(setUser({avatarURL:data.avatarURL,id:data.id,fullName:data.full_name,username:data.user_name}));
    } catch (error) {}
  },
  
  
}),

  editPassword: builder.mutation({
    query(password) {
      return {
        url: `/user/edit_password?password=${password}`,
      };
    },
    async onQueryStarted(args, { dispatch, queryFulfilled }) {
      try {
        const { data } = await queryFulfilled;
      } catch (error) {}
    },
  }),
  verifyCodePassword: builder.mutation({
    query(code) {
      return {
        url: `/user/edit_password?code=${code}`,
        method:'PUT'
      };
    },
    async onQueryStarted(args, { dispatch, queryFulfilled }) {
      try {
        const { data } = await queryFulfilled;
      } catch (error) {}
    },
  }),
  editEmail: builder.mutation({
    query({password,email}) {
      return {
        url: `/user/edit_email?password=${password}&email=${email}`,
        method:'PUT'
      };
    },
    async onQueryStarted(args, { dispatch, queryFulfilled }) {
      try {
        const { data } = await queryFulfilled;
      } catch (error) {}
    },
  })

  
})
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useEditEmailMutation,useVerifyCodePasswordMutation,useEditPasswordMutation,useEditUserMutation,useGetUserQuery } = userApi