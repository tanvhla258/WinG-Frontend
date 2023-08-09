import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { URL } from '../constant/constant'
import type { RootState } from '../redux/store'; // Import the RootState type if it's defined in your Redux store file
import { setPendingReceived, setPendingSend } from '../features/notification/notificationSlice';
import { apiSlice } from './api';

// Define a service using a base URL and expected endpoints

export const relationshipApi = apiSlice.injectEndpoints({
//   reducerPath: 'relationshipApi',
//   baseQuery: fetchBaseQuery({ baseUrl: `${URL}/relationship`, 
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
    
  getRelationship: builder.query({
    query(id) {
      return {
        url: `/relationship?user_id=${id}`,
      };
    },
    
  }),
  getListFriend: builder.query({
    query(userId: string | null) {
      if (!userId)
      return {
        url: `/relationship/list_friend`,
      };
      else return {
        url: `/relationship/list_friend?user_id=${userId}`,

      }
    },
  }),
  getListReceived: builder.mutation({
    query() {
      return {
        url: `/relationship/list_received_request`,
      };
  },
  async onQueryStarted(args, { dispatch, queryFulfilled }) {
    try {
      const { data } = await queryFulfilled;
      dispatch(setPendingReceived(data));
    } catch (error) {}
  },



}),
  getListSend: builder.mutation({
    query() {
      return {
        url: `/relationship/list_sent_request`,
      };
  },
  async onQueryStarted(args, { dispatch, queryFulfilled }) {
    try {
      const { data } = await queryFulfilled;
      dispatch(setPendingSend(data));
    } catch (error) {}
  },
  
}),

  addFriend: builder.mutation({
    query(id) {
      return {
        url: `/relationship/request?user_id=${id}`,
        method:'POST'
      };
    },
  }),
  acceptInvite: builder.mutation({
    query(id) {
      return {
        url: `/relationship/accept?user_id=${id}`,
        method:'POST'
      };
    },
  }),
  unfriend: builder.mutation({
    query(id) {
      return {
        url: `/relationship/unfriend?user_id=${id}`,
        method:'DELETE'
      };
    },
  }),
  cancelRequest: builder.mutation({
    query(id) {
      return {
        url: `/relationship/cancel_request?user_id=${id}`,
        method:'DELETE'
      };
    },})
  
  
})
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetListSendMutation,useGetListReceivedMutation,useCancelRequestMutation,useUnfriendMutation,useAcceptInviteMutation,useGetRelationshipQuery,useAddFriendMutation,useGetListFriendQuery } = relationshipApi