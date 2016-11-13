import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import createLogger from 'redux-logger'
import injectTapEventPlugin from 'react-tap-event-plugin'
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

injectTapEventPlugin()

ReactDOM.render(
  <Provider store={store}>
    <Router history={syncHistoryWithStore(browserHistory, store)}>
      <Route path="/" component={Layout}>
        <IndexRoute component={Home} />
        <Route path="heroes/:heroId" component={Details} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
)
