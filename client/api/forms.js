import axios from 'axios'
import { dispatchData } from './utils'
import { formActions as A } from 'dux/forms'

// Forms
export const getForms = dispatch => {
  const fake = new Promise(resolve => {
    setTimeout(() => {
      // empty return test
      // resolve([])
      resolve(require('client/examples/fakeForms.js'))
    }, 1000)
  })

  return fake.then(data => {
    dispatch(dispatchData(A.LOAD, data))
  })
}

export const updateForm = ({ id, nextForms }) => dispatch => {
  const fake = new Promise(resolve => {
    setTimeout(() => {
      resolve(nextForms)
    }, 500)
  })

  fake.then(data => {
    dispatch(dispatchData(A.UPDATE, data))
  })
}

export const createForm = ({ newForm }) => dispatch => {
  const fake = new Promise(resolve => {
    setTimeout(() => {
      resolve(newForm)
    }, 500)
  })
  return fake.then(data => {
    dispatch(dispatchData(A.CREATE, data))
    return data
  })
}

export const deleteForm = ({ id, nxtForms }) => dispatch => {
  const fake = new Promise(resolve => {
    setTimeout(() => {
      resolve(nxtForms)
    }, 700)
  })
  fake.then(data => {
    dispatch(dispatchData(A.DELETE, data))
  })
}
