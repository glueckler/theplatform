import { combineReducers } from 'redux'
import elements from 'dux/elements'

import template, { TEMPLATE } from './template'
import forms, { FORMS } from './forms'
import formFields, { FORM_FIELDS } from './formFields'

export const ACTIONS = {
  TEMPLATE,
  FORMS,
  FORM_FIELDS,
}

export default combineReducers({
  ...elements,
  template,
  forms,
  formFields,
})
