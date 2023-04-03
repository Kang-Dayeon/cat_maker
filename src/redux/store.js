import { configureStore } from '@reduxjs/toolkit'
import {persistReducer,PURGE, PERSIST} from 'redux-persist'
import rootReducer from './rootReducer'
import storage from 'redux-persist/lib/storage'
import {logger} from 'redux-logger/src'

const persistConfig = {
  key: 'root',
  storage
}

const reducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer,
  // middleware: (getDefaultMiddleware) =>
  //   //미들웨어 작성시 에러 주의
  //   getDefaultMiddleware(
  //     {
  //       serializableCheck: {
  //         ignoredActions: [PERSIST, PURGE],
  //       },
  //     }
  //   ).concat(logger)
})

export { store }