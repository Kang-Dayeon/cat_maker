import {combineReducers} from 'redux'
import reducer from './cats'
import loginReducer from './login'

const rootReducer = combineReducers({
  reducer,
  loginReducer
})

export default rootReducer