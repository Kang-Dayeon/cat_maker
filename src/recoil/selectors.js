import {selector} from 'recoil'
import {catListState} from './atoms'

export const catListGetter = selector({
  key: 'catListGetter',
  get: ({get}) => {
    return get(catListState)
  }
})