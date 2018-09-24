import { formActions as A } from 'dux/forms'
import { mkAPIReq } from 'api/utils'

export const getForms = mkAPIReq({
  fakeData: require('client/examples/fakeForms.js'),
  action: A.LOAD,
})

export const updateForm = ({ nextForms }) =>
  mkAPIReq({
    fakeData: nextForms,
    action: A.UPDATE,
  })

export const createForm = ({ newForm }) =>
  mkAPIReq({
    fakeData: newForm,
    action: A.CREATE,
  })

export const deleteForm = ({ nxtForms }) =>
  mkAPIReq({ fakeData: nxtForms, action: A.DELETE })
