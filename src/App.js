import './App.css';
import {BrowserRouter} from 'react-router-dom'
import Routers from './router/routes'
import store from './redux/store'
import { Provider } from 'react-redux'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routers />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
