import axios from 'axios'
import dispatchData from './dispatchData'
import { ACTIONS as A } from 'dux'

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

export const createFormField = ({ nxtField }) => dispatch => {
  const fake = new Promise(resolve => {
    setTimeout(() => {
      resolve(nxtField)
    }, 600)
  })
  fake.then(data => {
    dispatch(dispatchData(A.FORM_FIELDS.CREATE, data))
  })
}

export const updateFormField = ({ nextFormFields }) => dispatch => {
  const fake = new Promise(resolve => {
    setTimeout(() => {
      resolve(nextFormFields)
    }, 600)
  })
  fake.then(data => {
    dispatch(dispatchData(A.FORM_FIELDS.UPDATE, data))
  })
}

export const deleteFormField = ({ id, nxtFormFields }) => dispatch => {
  const fake = new Promise(resolve => {
    setTimeout(() => {
      resolve(nxtFormFields)
    }, 600)
  })
  fake.then(data => {
    dispatch(dispatchData(A.FORM_FIELDS.DELETE, data))
  })
}
