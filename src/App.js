import './App.css'
import {BrowserRouter} from 'react-router-dom'
import Routers from './router/routes'
//redux
import { store } from './redux/store'
import {Provider} from 'react-redux'
import {persistStore} from 'redux-persist'
import {PersistGate} from 'redux-persist/integration/react'
//recoil
import { RecoilRoot } from 'recoil'

export const persistor = persistStore(store)

function App() {
  return (
    <RecoilRoot>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Routers/>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </RecoilRoot>
  )
}

export default App
