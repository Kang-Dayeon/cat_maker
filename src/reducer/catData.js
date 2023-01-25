import {catList} from '../data/cat_List'
export const INCREASE = 'INCREASE'
export const DIE = 'DIE'
export const FAT = 'FAT'

export const increaseCount = (currentId, currentWeight, date, currentAge) => ({ type: INCREASE, currentId, currentWeight, date, currentAge});
export const die = (currentId, currentDid) => ({type: DIE, currentId, currentDid})
export const fat = (currentId, currentFat) => ({type: FAT, currentId, currentFat})

const initialState = catList

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREASE:
      state[action.currentId].weight = action.currentWeight
      state[action.currentId].date.push(action.date)
      if(state[action.currentId].weight % 3 === 0 && state[action.currentId].weight <= 42){
        state[action.currentId].age = action.currentAge + 1
      }
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

