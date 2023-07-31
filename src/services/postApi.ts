import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { URL } from '../constant/constant'
import type { RootState } from '../redux/store'; // Import the RootState type if it's defined in your Redux store file
import { addPost, deletePost, setComment, setPost } from '../features/post/postSlice';

// Define a service using a base URL and /expected endpoints

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${URL}/post`, 
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
          url: '/me',
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
    getPublicPost: builder.query({
      query() {
        return {
          url: '/new_feed',
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
      getProfilePost: builder.query({
        query({username,id} : {username:string | null,id:string | null}) {
          if (!username && id)
              return {
                url: `/user?user_id=${id}`,
              };
          if (username && !id)
              return {
                url: `/user?username=${username}`,
              };
          return {
            url: `/user?username=${username}&user_id=${id}`,
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
  createComment: builder.mutation({
      query(comment) {
        return {
          url: '/comment',
          method: 'POST',
          body: comment,
        };
      },
  }),
  getComments: builder.query({
    query(postId) {
      return {
        url: `/comment?post_id=${postId}`,
        method: 'GET',
      };
    },  
    async onQueryStarted(args, { dispatch, queryFulfilled }) {
      try {
        const { data } = await queryFulfilled;
        dispatch(setComment(data));
      } catch (error) {
      }
    },
}

),     
deletePost: builder.mutation({
  query(postId) {
    return {
      url: `?post_id=${postId}`,
      method: 'DELETE',
    };
  },  
  async onQueryStarted(args, { dispatch, queryFulfilled }) {
    try {
      const { data } = await queryFulfilled;
      dispatch(deletePost(data));
    } catch (error) {
    }
  },
}

),          
})
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useDeletePostMutation,useGetProfilePostQuery,useGetPublicPostQuery,useGetCommentsQuery,useCreatePostMutation, useGetOnwPostsQuery,useCreateCommentMutation } = postApi