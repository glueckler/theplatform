import { combineReducers } from 'redux'
import elements from 'dux/elements'

import template, { TEMPLATE } from './template'

export const ACTIONS = {
  TEMPLATE,
}

export default combineReducers({
  ...elements,
  template,
})
