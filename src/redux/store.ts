import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { userApi } from '../services/userApi'
import { authApi } from '../services/authApi'

import { combineReducers } from '@reduxjs/toolkit'
import type { PreloadedState } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  [authApi.reducerPath]: authApi.reducer,

})
export const setupStore = (preloadedState?: PreloadedState<RootState>) => {

return  configureStore({
  reducer: rootReducer,
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware,authApi.middleware),
    preloadedState 
})
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>

export type AppDispatch = AppStore['dispatch']
