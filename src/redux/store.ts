import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { userApi } from '../services/userApi'
import { authApi } from '../services/authApi'
import { postApi } from '../services/postApi'
import authSlice from '../features/auth/authSlice'
import userSlice from '../features/user/userSlice'
import postSlice from '../features/post/postSlice'
import { combineReducers } from '@reduxjs/toolkit'
import type { PreloadedState } from '@reduxjs/toolkit'
import { publicApi } from '../services/publicApi'
import { relationshipApi } from '../services/relationshipApi'


const rootReducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [postApi.reducerPath]: postApi.reducer,
  [publicApi.reducerPath]: publicApi.reducer,
  [relationshipApi.reducerPath]: relationshipApi.reducer,



  auth: authSlice, // Add your authSlice reducer here
  user: userSlice, // Add your userSlice reducer here
  post: postSlice, // Add your userSlice reducer here

})
export const setupStore = (preloadedState?: PreloadedState<RootState>) => {

return  configureStore({
  reducer: rootReducer,
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware,relationshipApi.middleware,userApi.middleware,postApi.middleware,publicApi.middleware),
    preloadedState 
})
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>

export type AppDispatch = AppStore['dispatch']