import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { URL } from '../constant/constant'
import type { RootState } from '../redux/store'; // Import the RootState type if it's defined in your Redux store file
import { addComment, addPost, deleteComment, deletePost, setComment, setPost, updateComment, updatePost } from '../features/post/postSlice';
import { apiSlice } from './api';
// Define a service using a base URL and /expected endpoints

export const postApi = apiSlice.injectEndpoints({
  // reducerPath: 'postApi',
  // baseQuery: fetchBaseQuery({ baseUrl: `${URL}/post`, 
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
    getOnwPosts: builder.query({
      query() {
        return {
          url: '/post/me',
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
          url: '/post/new_feed',
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
                url: `/post/user?user_id=${id}`,
              };
          if (username && !id)
              return {
                url: `/post/user?username=${username}`,
              };
          return {
            url: `/post/user?username=${username}&user_id=${id}`,
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
        url: `/post/create`,
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
 updatePost: builder.mutation({
  query(postData) {
    return {
      url: `/post`,
      method: 'PUT',
      body: postData,
    };
  },
async onQueryStarted(args, { dispatch, queryFulfilled }) {
  try {
    const { data } = await queryFulfilled;
    dispatch(updatePost(data));
  } catch (error) {

  }
},
}),
deletePost: builder.mutation({
  query(postId) {
    return {
      url: `/post?post_id=${postId}`,
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
  createComment: builder.mutation({
      query(comment) {
        return {
          url: '/post/comment',
          method: 'POST',
          body: comment,
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(addComment(data));
        } catch (error) {
        }
      },
  }),
  getComments: builder.query({
    query(postId) {
      return {
        url: `/post/comment?post_id=${postId}`,
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
  updateComent: builder.mutation({
  query({commentId,content}:{commentId:string,content:string}) {
    return {
      url: `/post/comment?comment_id=${commentId}&content=${content}`,
      method: 'PUT',
    };
  },  
  async onQueryStarted(args, { dispatch, queryFulfilled }) {
    try {
      const { data } = await queryFulfilled;
      dispatch(updateComment(data));
    } catch (error) {
    }
  },
}
), 
  deleteComment: builder.mutation({
  query(commentId) {
    return {
      url: `/post/comment?comment_id=${commentId}`,
      method: 'DELETE',
    };
  },  
  async onQueryStarted(args, { dispatch, queryFulfilled }) {
    try {
      const { data } = await queryFulfilled;
      dispatch(deleteComment(data));
    } catch (error) {
    }
  },
}
), 
})
})


export const { useUpdateComentMutation,useDeleteCommentMutation,useUpdatePostMutation,useDeletePostMutation,useGetProfilePostQuery,useGetPublicPostQuery,useGetCommentsQuery,useCreatePostMutation, useGetOnwPostsQuery,useCreateCommentMutation } = postApi