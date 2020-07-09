import React from 'react'
import ReactDOM from 'react-dom'
import { Provider as StoreProvider } from 'react-redux'
import store from './redux/store'
import { PerxApiServiceProvider } from './contexts/perxApiService'
import PerxApiService from './service/perxApiService'
import App from './App'
import * as serviceWorker from './serviceWorker'

const perxApiService = new PerxApiService()

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <PerxApiServiceProvider value={perxApiService}>
        <App />
      </PerxApiServiceProvider>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
