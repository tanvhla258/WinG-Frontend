import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IPending } from '../../types/model'

  
  // Define the initial state using that type
  interface IPendingState {
    pendings: Array<IPending>
  }
  const initialState: IPendingState = {
    pendings: []
  }

  export const notificationSlice = createSlice({
    name: 'notificationSlice',
    initialState,
    reducers: {
   
      setPendings: (state, action: PayloadAction<Array<IPending>>) => {
        state.pendings = action.payload;
      },
    },
  })
  
  export const { setPendings } = notificationSlice.actions
  
  // Other code such as selectors can use the imported `RootState` type
  
  export default notificationSlice.reducer