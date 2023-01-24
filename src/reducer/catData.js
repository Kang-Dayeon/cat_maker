import {catList} from '../data/cat_List'
export const INCREASE = 'COUNT/INCREASE'
export const AGE = 'COUNT/AGE'
export const DIE = 'DIE'

export const increaseCount = (currentId, currentWeight) => ({ type: INCREASE, currentId, currentWeight});
export const addAge = (currentId, currentAge) => ({ type: AGE, currentId, currentAge })
export const die = (currentId, currentDid) => ({type: DIE, currentId, currentDid})

const initialState = catList

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREASE:
      state[action.currentId].weight = action.currentWeight
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
    default:
      return state;
  }
};

export default reducer

