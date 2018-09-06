import { combineReducers } from 'redux'
import elements from 'dux/elements'

import forms from './forms'
import formFields from './formFields'
import courses from './courses'
import registrants from './registrants'

export default combineReducers({
  ...elements,
  forms,
  formFields,
  courses,
  registrants,
})
