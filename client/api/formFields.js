import axios from 'axios'
import { dispatchData } from './utils'
import { formFieldsActions as A } from 'dux/formFields'

// Form Fields
export const getFormFields = dispatch => {
  const fake = new Promise(resolve => {
    setTimeout(() => {
      resolve(require('client/examples/fakeFormFields.js'))
    }, 1000)
  })

  fake.then(data => {
    dispatch(dispatchData(A.LOAD, data))
  })
}

export const createFormField = ({ nxtField }) => dispatch => {
  const fake = new Promise(resolve => {
    setTimeout(() => {
      resolve(nxtField)
    }, 600)
  })
  fake.then(data => {
    dispatch(dispatchData(A.CREATE, data))
  })
}

export const updateFormField = ({ nextFormFields }) => dispatch => {
  const fake = new Promise(resolve => {
    setTimeout(() => {
      resolve(nextFormFields)
    }, 600)
  })
  fake.then(data => {
    dispatch(dispatchData(A.UPDATE, data))
  })
}

export const deleteFormField = ({ id, nxtFormFields }) => dispatch => {
  const fake = new Promise(resolve => {
    setTimeout(() => {
      resolve(nxtFormFields)
    }, 600)
  })
  fake.then(data => {
    dispatch(dispatchData(A.DELETE, data))
  })
}
