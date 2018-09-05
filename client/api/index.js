import axios from 'axios'
import dispatchData from './dispatchData'
import { ACTIONS as A } from 'dux'

// Forms
export const getForms = dispatch => {
  const fake = new Promise(resolve => {
    setTimeout(() => {
      resolve(require('client/examples/fakeForms.js'))
    }, 1000)
  })

  fake.then(data => {
    dispatch(dispatchData(A.FORMS.LOAD, data))
  })
}


// Form Fields
export const getFormFields = dispatch => {
  const fake = new Promise(resolve => {
    setTimeout(() => {
      resolve(require('client/examples/fakeFormFields.js'))
    }, 1000)
  })

  fake.then(data => {
    dispatch(dispatchData(A.FORM_FIELDS.LOAD, data))
  })
}
