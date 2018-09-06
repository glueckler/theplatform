import { commonActionsGen } from './utils'

const actions = commonActionsGen('FORMS')

// Actions
export const FORMS = {
  ...actions,
}
// Reducers
export default (state = [], action) => {
  if (action.type === actions.LOAD || action.type === actions.UPDATE) {
    return [...action.data]
  }
  if (action.type === actions.CREATE) {
    return [...state, action.data]
  }
  if (action.type === actions.DELETE) {
    return [...action.data]
  }

  // default
  return state
}
