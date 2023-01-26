import {catList} from '../data/cat_List'
export const INCREASE = 'INCREASE'
export const LIFE = 'STATE/LIFE'
export const BODY = 'STATE/BODY'
export const COUNT = 'MESSAGE/COUNT'
export const ADDMESSAGE = 'MESSAGE/ADDMESSAGE'

export const increaseCount = (currentId, currentWeight, date, currentAge) => ({ type: INCREASE, currentId, currentWeight, date, currentAge});
export const handleLifeState = (currentId, currentLifeState) => ({type: LIFE, currentId, currentLifeState})
export const handleBodyState = (currentId, currentBodyState) => ({type: BODY, currentId, currentBodyState})
export const messageNum = (currentId, currentNum) => ({type: COUNT, currentId,  currentNum})
export const messageAdd = (currentId, message) => ({type: ADDMESSAGE, currentId,  message})

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
      state[action.currentId].death = action.currentLifeState
      return[
        ...state
      ]
    case BODY:
      state[action.currentId].fat = action.currentBodyState
      return[
        ...state
      ]
    case COUNT:
      state[action.currentId].messageNum = action.currentNum
      return[
        ...state
      ]
    case ADDMESSAGE:
      state[action.currentId].message = action.message
      return[
        ...state
      ]
    default:
      return state;
  }
};

export default reducer

