import cat from './cats'
import user from './login'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
  cat,
  user
})

export default rootReducer