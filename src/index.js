import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import { createHashHistory as createHistory } from 'history'
import rootReducers from './components/rootReducer'
import routerMiddleware from './components/routerMiddleware'
import startListener from './components/routerListener'
import App from 'components/App'

const history = createHistory()

const middleware = [routerMiddleware(history)]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const store = createStore(rootReducers, applyMiddleware(...middleware))
startListener(history, store)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
