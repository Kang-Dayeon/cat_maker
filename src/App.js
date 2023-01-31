import './App.css'
import {BrowserRouter} from 'react-router-dom'
import Routers from './router/routes'
import { store } from './redux/store'
import {Provider} from 'react-redux'
import {persistStore} from 'redux-persist'
import {PersistGate} from 'redux-persist/integration/react'

const persistor = persistStore(store)

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routers/>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  )
}

export default App
