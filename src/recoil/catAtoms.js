import * as data from '../database/catList'
import {atom} from 'recoil'
import {recoilPersist} from 'recoil-persist'

const {persistAtom} = recoilPersist()

// todos: redux로 만든거 recoil로 변경하기
// atom하나당 하나의 값
export const catListState = atom({
  key: 'catListState',
  default: data.catList,
  effects_UNSTABLE: [persistAtom]
})

export const selectedCatState = atom({
  key: 'selectedCattState',
  default: null,
  effects_UNSTABLE: [persistAtom]
})



