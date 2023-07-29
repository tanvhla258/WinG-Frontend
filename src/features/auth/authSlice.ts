import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type AuthState = {
  // user: UserData | null
  accessToken: string | null
  refreshToken: string | null

}

const slice = createSlice({
  name: 'auth',
  initialState: { accessToken: null, refreshToken: null } as AuthState,
  reducers: {
    setCredentials: (
      state,
      { payload: {  accessToken,refreshToken } }: PayloadAction<{ refreshToken: string; accessToken: string }>
    ) => {
      // state.user = user
      state.accessToken = accessToken
      state.refreshToken = refreshToken

    },
    logout: (
      state,
    ) => {
      state.accessToken = null
      state.refreshToken = null
    },
  },
})

export const { setCredentials,logout} = slice.actions

export default slice.reducer

