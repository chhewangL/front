import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./authApi";
import userReducer from "./userSlice"
import { productApi } from "./productApi";





export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    user: userReducer


  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
    authApi.middleware,
    productApi.middleware
  ])
})