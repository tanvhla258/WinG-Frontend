import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../redux/store'
import { UserData } from '../../types/model'

  
  // Define the initial state using that type
  interface IUserState {
    user: UserData | null;
  }
  const initialState: IUserState = {
    user: null
  }
  
  export const userSlice = createSlice({
    name: 'userSlice',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
      // Use the PayloadAction type to declare the contents of `action.payload`
      logout:()=>initialState,
      setUser: (state, action: PayloadAction<UserData>) => {
        state.user = action.payload;
      },
    },
  })
  
  export const { logout,setUser } = userSlice.actions
  
  // Other code such as selectors can use the imported `RootState` type
  
  export default userSlice.reducer