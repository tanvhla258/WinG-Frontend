import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IComment, IPost } from '../../types/model'

  
  // Define the initial state using that type
  interface IPostListState {
    posts: Array<IPost>
    comments:Array<IComment> | null
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
        const postIdToDelete = action.payload.id;
        state.posts = state.posts.filter(post => post.id !== postIdToDelete);
      },
      setPost: (state, action: PayloadAction<Array<IPost>>) => {
        state.posts = action.payload;
      },
    
      setComment: (state, action: PayloadAction<Array<IComment>>) => {
        state.comments = action.payload;
      },},
  })
  
  export const { addPost,setComment,setPost,deletePost,updatePost } = postSlice.actions
  
  // Other code such as selectors can use the imported `RootState` type
  
  export default postSlice.reducer