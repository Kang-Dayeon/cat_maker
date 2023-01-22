import {catList} from '../data/cat_List'
export const INCREASE = 'COUNT/INCREASE'

export const increaseCount = (catList)=> ({ type: INCREASE, catList});

const initialState = catList

const weightIncrease = (state = initialState, action) => {
  switch (action.type) {
    case INCREASE:
      return {
        ...state,
        weight : action.weight + 0.5
      };

    default:
      return state;
  }
};

export default weightIncrease

