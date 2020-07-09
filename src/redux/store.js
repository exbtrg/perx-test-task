import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import rootReducer from './rootReducers'

const isDevMode = process.env.NODE_ENV === 'development'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

const middleWares = [thunk]

const devExtensions = () => {
  if (isDevMode) {
    middleWares.push(logger)
    return composeEnhancers(applyMiddleware(...middleWares))
  }
  return applyMiddleware(...middleWares)
}

const store = createStore(rootReducer, devExtensions())

export default store
