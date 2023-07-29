import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { URL } from '../constant/constant'
export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${URL}/` }),
    endpoints: (builder) => ({
      loginWithUsername: builder.mutation({
        query: (loginData) => ({
          url: 'login/basic/username-password',
          method: 'POST',
          body: loginData,
        }),
       
      }),
      loginWithEmail: builder.mutation({
        query: (loginData) => ({
          url: 'login/basic/email-password',
          method: 'POST',
          body: loginData,
        }),
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