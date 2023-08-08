import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IPending } from '../../types/model'

  
  // Define the initial state using that type
  interface IPendingState {
    pendingReceived: Array<IPending>
    pendingSend: Array<IPending>

  }
  const initialState: IPendingState = {
    pendingReceived: [],
    pendingSend:[]
  }

  export const notificationSlice = createSlice({
    name: 'notificationSlice',
    initialState,
    reducers: {
   
      setPendingReceived: (state, action: PayloadAction<Array<IPending>>) => {
        state.pendingReceived = action.payload
      },
      setPendingSend: (state, action: PayloadAction<Array<IPending>>) => {
        state.pendingSend = action.payload
      },
    },
  })
  
  export const { setPendingReceived,setPendingSend } = notificationSlice.actions
  
  // Other code such as selectors can use the imported `RootState` type
  
  export default notificationSlice.reducer