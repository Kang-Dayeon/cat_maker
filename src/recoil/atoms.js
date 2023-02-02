import * as data from '../database/cats'
import {atom} from 'recoil'

// todos: redux로 만든거 recoil로 변경하기
// atom하나당 하나의 값
export const catListState = atom({
  key: 'catListState',
  default: data.catList
})

export const selectedCatState = atom({
  key: 'selectedCattState',
  default: null
})