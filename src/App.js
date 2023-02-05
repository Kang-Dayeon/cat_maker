import './App.css'
import {BrowserRouter} from 'react-router-dom'
import Routers from './router/routes'
//redux
// import { store } from './redux/store'
// import {Provider} from 'react-redux'
// import {persistStore} from 'redux-persist'
// import {PersistGate} from 'redux-persist/integration/react'
//recoil
import { RecoilRoot } from 'recoil'

// export const persistor = persistStore(store)

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routers/>
      </BrowserRouter>
    </RecoilRoot>
  )
}

export default App
