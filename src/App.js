import './App.css'
import {BrowserRouter} from 'react-router-dom'
import Routers from './router/routes'
//redux
import { store } from './redux/store'
import {Provider} from 'react-redux'
import {persistStore} from 'redux-persist'
import {PersistGate} from 'redux-persist/integration/react'

export const persistor = persistStore(store)

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routers/>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  )
}

export default App
