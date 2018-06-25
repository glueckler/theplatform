import { combineReducers } from 'redux'

import template, { TEMPLATE } from './template'

export const ACTIONS = {
  TEMPLATE,
}

export default combineReducers({
  template,
})
