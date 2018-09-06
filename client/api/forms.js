import axios from 'axios'
import dispatchData from './dispatchData'
import { ACTIONS as A } from 'dux'

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
    dispatch(dispatchData(A.FORMS.LOAD, data))
  })
}

export const updateForm = ({ id, nextForms }) => dispatch => {
  const fake = new Promise(resolve => {
    setTimeout(() => {
      resolve(nextForms)
    }, 500)
  })

  fake.then(data => {
    dispatch(dispatchData(A.FORMS.UPDATE, data))
  })
}

export const createForm = ({ newForm }) => dispatch => {
  const fake = new Promise(resolve => {
    setTimeout(() => {
      resolve(newForm)
    }, 500)
  })
  fake.then(data => {
    dispatch(dispatchData(A.FORMS.CREATE, data))
  })
}

export const deleteForm = ({ id, nxtForms }) => dispatch => {
  const fake = new Promise(resolve => {
    setTimeout(() => {
      resolve(nxtForms)
    }, 700)
  })
  fake.then(data => {
    dispatch(dispatchData(A.FORMS.DELETE, data))
  })
}
