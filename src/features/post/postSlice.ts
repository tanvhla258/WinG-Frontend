import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IComment, IPost } from '../../types/model'

  
  // Define the initial state using that type
  interface IPostListState {
    posts: Array<IPost>
    comments:Array<IComment> 
  }
  const initialState: IPostListState = {
    posts:[],
    comments:[]
  }

  export const postSlice = createSlice({
    name: 'postSlice',
    initialState,
    reducers: {
      addPost: (state, action: PayloadAction<IPost>) => {
        state.posts = [...state.posts,action.payload]
      },
      deletePost: (state, action: PayloadAction<IPost>) => {
        const postIdToDelete = action.payload.id;
        state.posts = state.posts.filter(post => post.id !== postIdToDelete);
      },
      updatePost: (state, action: PayloadAction<IPost>) => {
        const updatedPost = action.payload;
        const postIdToUpdate = updatedPost.id;
        const postIndex = state.posts.findIndex(post => post.id === postIdToUpdate);
        if (postIndex !== -1) {
          state.posts[postIndex] = updatedPost;
        }
      },
      setPost: (state, action: PayloadAction<Array<IPost>>) => {
        state.posts = action.payload;
      },
    
      setComment: (state, action: PayloadAction<Array<IComment>>) => {
        state.comments = action.payload;
      },
      addComment: (state, action: PayloadAction<IComment>) => {
        state.comments = [...state.comments,action.payload]
      },
      updateComment: (state, action: PayloadAction<IComment>) => {
        const commentIdToDelete = action.payload.id;
        state.comments = state.comments.filter(comment => comment.id !== commentIdToDelete);
      },
      deleteComment: (state, action: PayloadAction<IComment>) => {
        const updatedcomment = action.payload;
        const commentIdToUpdate = updatedcomment.id;
        const commentIndex = state.comments.findIndex(comment => comment.id === commentIdToUpdate);
        if (commentIndex !== -1) {
          state.comments[commentIndex] = updatedcomment;
        }
      },
    },
  })
  
  export const { addComment,deleteComment,updateComment,addPost,setComment,setPost,deletePost,updatePost } = postSlice.actions
  
  // Other code such as selectors can use the imported `RootState` type
  
  export default postSlice.reducer