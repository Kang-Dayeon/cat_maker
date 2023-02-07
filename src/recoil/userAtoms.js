import {atom} from 'recoil'
import {userList} from '../database/userList'
import {recoilPersist} from 'recoil-persist'

const {persistAtom} = recoilPersist()

export const userListState = atom({
  key: 'userListState',
  default: userList,
  effects_UNSTABLE: [persistAtom],
})

export const loginUserState = atom({
  key: 'loginUserState',
  default: null,
  effects_UNSTABLE: [persistAtom],
})

export const isLoginState = atom({
  key: 'isLoginState',
  default: false,
  effects_UNSTABLE: [persistAtom],
})
