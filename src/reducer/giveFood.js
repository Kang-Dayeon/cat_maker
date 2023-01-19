import {catList} from '../data/cat_List'
export const INCREASE = 'COUNT/INCREASE'

export const increaseCount = ()=> ({ type: INCREASE });

const initialState =
  [{
    id: 0,
    name: "치즈",
    gender: "Female",
    image: '../image/cat01.jpg',
    dieImage: '../image/cat01_die.jpg',
    age: 1,
    weight: 1,
    pat: false,
    die: false
  },
{
  id: 1,
    name: "콩떡",
  gender: "Male",
  image: '../image/cat02.jpg',
  dieImage: '../image/cat02_die.jpg',
  age: 1,
  weight: 1,
  pat: false,
  die: false
},
{
  id: 2,
    name: "쿠로",
  gender: "Female",
  image: '../image/cat03.jpg',
  dieImage: '../image/cat03_die.jpg',
  age: 1,
  weight: 1,
  pat: false,
  die: false
}]


const counter = (state = initialState, action) => {
  switch (action.type) {
    case INCREASE:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default counter

