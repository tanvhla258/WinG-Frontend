import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { URL } from '../constant/constant'
import { userApi } from './userApi';
import { apiSlice } from './api';
export const authApi = apiSlice.injectEndpoints({
    // reducerPath: 'authApi',
    // baseQuery: fetchBaseQuery({ baseUrl: `${URL}/` }),
    endpoints: (builder) => ({
      loginWithUsername: builder.mutation({
        query: (loginData) => ({
          url: 'login/basic/username-password',
          method: 'POST',
          body: loginData,
        }),
        // async onQueryStarted(args, { dispatch, queryFulfilled }) {
        //   try {
        //     await queryFulfilled;
        //     await dispatch(userApi.endpoints.getUser.initiate(null));
        //   } catch (error) {}
        // },
       
      }),
      loginWithEmail: builder.mutation({
        query: (loginData) => ({
          url: 'login/basic/email-password',
          method: 'POST',
          body: loginData,
        }),
        async onQueryStarted(args, { dispatch, queryFulfilled }) {
          try {
            await queryFulfilled;
            await dispatch(userApi.endpoints.getUser.initiate(null));
          } catch (error) {}
        },
      }),
      register: builder.mutation({    
        query: (registerData) => ({
          url: 'register/basic',
          method: 'POST',
          body: registerData,
        }),
    
      }),
      // Add other authentication endpoints as needed: logout, registration, etc.
    }),
  });
  
  export const {useRegisterMutation, useLoginWithEmailMutation,useLoginWithUsernameMutation } = authApi;