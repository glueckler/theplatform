import { commonActionsGen } from './utils'

const actions = commonActionsGen('COURSES')

// Actions
export const coursesActions = {
  ...actions,
}

export default (state = [], action) => {
  if (action.type === actions.LOAD) {
    return [...action.data]
  }
  return state
}
