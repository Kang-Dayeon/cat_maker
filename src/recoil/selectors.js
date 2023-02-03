import {selector} from 'recoil'
import {catListState} from './catAtoms'
import {userListState,loginUserState,isLoginState} from './userAtoms'

export const catListSelector = selector({
  key: 'catListSelector',
  get: ({get}) => {
    return get(catListState)
  }
})

export const userListSelector = selector({
  key: 'userListSelector',
  get: ({get}) => {
    return get(userListState)
  }
})

export const loginUserSelector = selector({
  key: 'loginUserSelector',
  get: ({get}) => {
    return get(loginUserState)
  },
  set: ({set}, newValue) => {
    return set(loginUserState, newValue)
  }
})

export const isLoginSelector = selector({
  key: 'isLoginSelector',
  get: ({get}) => {
    return get(isLoginState)
  },
  set: ({set}, newValue) => {
    return set(isLoginState, newValue)
  }
})
