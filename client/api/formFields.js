import { formFieldsActions as A } from 'dux/formFields'
import { mkAPIReq } from 'api/utils'

export const getFormFields = mkAPIReq({
  fakeData: require('client/examples/fakeFormFields.js'),
  action: A.LOAD,
})

export const createFormField = ({ nxtField }) =>
  mkAPIReq({ fakeData: nxtField, action: A.CREATE })

export const updateFormField = ({ nextFormFields }) =>
  mkAPIReq({ fakeData: nextFormFields, action: A.UPDATE })

export const deleteFormField = ({ id, nxtFormFields }) =>
  mkAPIReq({ fakeData: nxtFormFields, action: A.DELETE })
