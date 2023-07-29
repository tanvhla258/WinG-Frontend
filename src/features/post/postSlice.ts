import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IPost } from '../../types/model'

  
  // Define the initial state using that type
  interface IPostListState {
    ownPosts: Array<IPost>
    publicPosts: Array<IPost>

  }
  const initialState: IPostListState = {
    ownPosts: [],
    publicPosts:[]
  }

  export const postSlice = createSlice({
    name: 'postSlice',
    initialState,
    reducers: {
      addPost: (state, action: PayloadAction<IPost>) => {
        state.ownPosts = [...state.ownPosts,action.payload]
      },
      setPost: (state, action: PayloadAction<Array<IPost>>) => {
        state.ownPosts = action.payload;
      },
    },
  })
  
  export const { addPost,setPost } = postSlice.actions
  
  // Other code such as selectors can use the imported `RootState` type
  
  export default postSlice.reducer