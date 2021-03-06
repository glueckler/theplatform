import { commonActionsGen } from './utils'

// Actions
const actions = commonActionsGen('FORM_FIELDS')
export const formFieldsActions = {
  ...actions,
}

// Reducers
export default (state = [], action) => {
  if (action.type === actions.LOAD) {
    return [...state, ...action.data]
  }
  if (action.type === actions.CREATE) {
    return [...state, action.data]
  }
  if (action.type === actions.UPDATE || action.type === actions.DELETE) {
    return [...action.data]
  }
  return state
}
