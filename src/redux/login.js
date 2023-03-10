import { userList } from '../database/userList'
import { createSlice } from '@reduxjs/toolkit'
import {PURGE} from 'redux-persist'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: userList,
    loginUser: null,
    isLogin: false
  },
  reducers: {
    login: (state, action) => {
      if(!state.users.some((item) => item.loginId === action.payload.loginId)){
        alert('아이디가 일치하지 않습니다.')
      } else if(!state.users.some((item) => item.password === action.payload.password)){
        alert('비밀번호가 일치하지 않습니다.')
      } else {
        state.loginUser = state.users.find(user => user.loginId === action.payload.loginId)
      }

      if(state.loginUser !== null){
        state.isLogin = true
      }
    },
    logout: (state, action) => {
      state.isLogin = false
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (initialState) => customElements.removeAll(initialState));
  }
})

export const { login, logout } = userSlice.actions
export default userSlice.reducer