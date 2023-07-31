import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { URL } from '../constant/constant'
import type { RootState } from '../redux/store'; // Import the RootState type if it's defined in your Redux store file

// Define a service using a base URL and expected endpoints

export const relationshipApi = createApi({
  reducerPath: 'relationshipApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${URL}/relationship`, 
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
    
  getRelationship: builder.query({
    query(id) {
      return {
        url: `?user_id=${id}`,
      };
    },
  }),
  getListFriend: builder.query({
    query() {
      return {
        url: `/list_friend`,
      };
    },
  }),
  addFriend: builder.mutation({
    query(id) {
      return {
        url: `/request?user_id=${id}`,
        method:'POST'
      };
    },
  }),
  acceptInvite: builder.mutation({
    query(id) {
      return {
        url: `/accept?user_id=${id}`,
        method:'POST'
      };
    },
  }),
  unfriend: builder.mutation({
    query(id) {
      return {
        url: `/unfriend?user_id=${id}`,
        method:'DELETE'
      };
    },
  }),
  cancelRequest: builder.mutation({
    query(id) {
      return {
        url: `/cancel_request?user_id=${id}`,
        method:'DELETE'
      };
    },
  })
  
  
})
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useCancelRequestMutation,useUnfriendMutation,useAcceptInviteMutation,useGetRelationshipQuery,useAddFriendMutation,useGetListFriendQuery } = relationshipApi