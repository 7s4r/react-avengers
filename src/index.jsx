import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import createLogger from 'redux-logger'
import allReducers from './utils/reducers'
import Layout from './containers/Layout'
import Home from './pages/home'
import Details from './pages/details'

const logger = createLogger()
const store = createStore(
  allReducers,
  applyMiddleware(
    thunk,
    promise,
    logger,
    routerMiddleware(browserHistory)
  )
)
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Layout}>
        <IndexRoute component={Home} />
        <Route path="heroes/:name" component={Details} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
)
