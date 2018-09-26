import { commonActionsGen } from './utils'
import { mergeByProp } from 'yoots'

const actions = commonActionsGen('FORMS')

// Actions
export const formActions = {
  ...actions,
}
// Reducers
export default (state = [], action) => {
  if (action.type === actions.LOAD || action.type === actions.UPDATE) {
    // merge by id Property to avoid duplicates
    return mergeByProp(state, action.data, 'id')
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
