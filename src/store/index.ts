import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: 'counter',
  initialState: {
    user: '',
    reward:0
  },
  reducers: {
    login : (state,{payload}) =>{
      // 为什么不用返回纯函数如下：
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.user = payload
    },
    changeReward : (state,{payload}) =>{
      state.reward = payload
    }
  }
})
export const {login,changeReward } = userSlice.actions
export default userSlice.reducer
