import { configureStore } from '@reduxjs/toolkit'
import catReducer from './cats'
import userReducer from './login'

export default configureStore({
  reducer: {
    cats: catReducer,
    user: userReducer
  }
})