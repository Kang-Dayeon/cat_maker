import { configureStore } from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import rootReducer from './rootReducer'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage
}

const reducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer
})

export { store }