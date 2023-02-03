import {atom} from 'recoil'
import {userList} from '../database/userList'

export const userListState = atom({
  key: 'userListState',
  default: userList
})

export const loginUserState = atom({
  key: 'loginUserState',
  default: null
})

export const isLoginState = atom({
  key: 'isLoginState',
  default: false
})
