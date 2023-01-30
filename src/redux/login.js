import { userList } from '../data/user'
import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userList,
    loginUser: null,
    isLogin: false
  },
  reducers: {
    login: (state, action) => {
      if(!state.userList.some((item) => item.loginId === action.payload.loginId)){
        alert('아이디가 일치하지 않습니다.')
      } else if(!state.userList.some((item) => item.password === action.payload.password)){
        alert('비밀번호가 일치하지 않습니다.')
      } else {
        state.loginUser = state.userList.find(user => user.loginId === action.payload.loginId)
      }

      if(state.loginUser !== null){
        state.isLogin = true
      }
    }
  }
})

export const { login } = userSlice.actions
export default userSlice.reducer