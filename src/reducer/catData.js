import {catList} from '../data/cat_List'
export const INCREASE = 'INCREASE'
export const AGE = 'AGE'
export const DIE = 'DIE'
export const FAT = 'FAT'

export const increaseCount = (currentId, currentWeight, date) => ({ type: INCREASE, currentId, currentWeight, date});
export const addAge = (currentId, currentAge) => ({ type: AGE, currentId, currentAge })
export const die = (currentId, currentDid) => ({type: DIE, currentId, currentDid})
export const fat = (currentId, currentFat) => ({type: FAT, currentId, currentFat})

const initialState = catList

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREASE:
      state[action.currentId].weight = action.currentWeight
      state[action.currentId].date.push(action.date)
      return[
        ...state
      ]
    case AGE:
      state[action.currentId].age = action.currentAge
      return[
        ...state
      ]
    case DIE:
      state[action.currentId].die = action.currentDid
      return[
        ...state
      ]
    case FAT:
      state[action.currentId].fat = action.currentFat
      return[
        ...state
      ]
    default:
      return state;
  }
};

export default reducer

