import { configureStore } from '@reduxjs/toolkit'
// 引入自己写的reducer
import userReducer from "./index"

export const store = configureStore({
  // 自己写的reducer在这注册
  reducer: {
    userReducer: userReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

