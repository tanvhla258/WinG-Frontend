import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { UserData } from '../types/model'
import { URL } from '../constant/constant'
import { userApi } from './userApi';
export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${URL}/login/` }),
    endpoints: (builder) => ({
      loginWithUsername: builder.mutation({
        query: (loginData) => ({
          url: 'basic/username-password',
          method: 'POST',
          body: loginData,
        }),
       
      }),
      loginWithEmail: builder.mutation({
        query: (loginData) => ({
          url: 'basic/email-password',
          method: 'POST',
          body: loginData,
        }),
       
      }),
      // Add other authentication endpoints as needed: logout, registration, etc.
    }),
  });
  
  export const { useLoginWithEmailMutation,useLoginWithUsernameMutation } = authApi;