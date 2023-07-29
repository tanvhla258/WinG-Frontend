import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { URL } from '../constant/constant'
import type { RootState } from '../redux/store'; // Import the RootState type if it's defined in your Redux store file
import { addPost, setPost } from '../features/post/postSlice';

// Define a service using a base URL and expected endpoints

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${URL}/post/`, 
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
    getOnwPosts: builder.query({
      query() {
        return {
          url: 'me',
        };
      },
    async onQueryStarted(args, { dispatch, queryFulfilled }) {
      try {
        const { data } = await queryFulfilled;
        dispatch(setPost(data));
      } catch (error) {
      }
    },
  }),
  createPost: builder.mutation({
    query(postData) {
      return {
        url: '/create',
        method: 'POST',
        body: postData,
      };
    },
  async onQueryStarted(args, { dispatch, queryFulfilled }) {
    try {
      const { data } = await queryFulfilled;
      dispatch(addPost(data));
    } catch (error) {
    }
  },
}),
})
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useCreatePostMutation, useGetOnwPostsQuery } = postApi