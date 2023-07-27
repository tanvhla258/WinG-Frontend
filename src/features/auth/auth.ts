import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { UserData } from "../../types/model"
import type { RootState } from '../../redux/store'

type AuthState = {
  user: UserData | null
  token: string | null
}

const slice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null } as AuthState,
  reducers: {
    setCredentials: (
      state,
      { payload: { user, token } }: PayloadAction<{ user: UserData; token: string }>
    ) => {
      state.user = user
      state.token = token
    },
  },
})

export const { setCredentials } = slice.actions

export default slice.reducer

