import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import reducers from 'dux/index'

const thunk = store => next => action =>
  typeof action === 'function'
    ? action(store.dispatch, store.getState)
    : next(action)

export default createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
)
