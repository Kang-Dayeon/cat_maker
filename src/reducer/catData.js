import {catList} from '../data/cat_List'
export const INCREASE = 'INCREASE'
export const LIFE = 'STATE/LIFE'
export const BODY = 'STATE/BODY'

export const increaseCount = (currentId, currentWeight, date, currentAge) => ({ type: INCREASE, currentId, currentWeight, date, currentAge});
export const handleLifeState = (currentId, currentLifeState) => ({type: LIFE, currentId, currentLifeState})
export const handleBodyState = (currentId, currentBodyState) => ({type: BODY, currentId, currentBodyState})

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
    case LIFE:
      state[action.currentId].die = action.currentLifeState
      return[
        ...state
      ]
    case BODY:
      state[action.currentId].fat = action.currentBodyState
      return[
        ...state
      ]
    default:
      return state;
  }
};

export default reducer

