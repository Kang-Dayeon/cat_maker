// import React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import catReducer from './cats'

export default configureStore({
  reducer: {
    cats: catReducer
  }
})