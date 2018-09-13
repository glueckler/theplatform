import { commonActionsGen } from './utils'

const A = commonActionsGen('COURSES')

// Actions
export const coursesActions = {
  ...A,
}

export default (state = [], action) => {
  if (action.type === A.LOAD) {
    return [...action.data]
  }
  if (action.type === A.CREATE) {
    return [...state, action.data]
  }
  if (action.type === A.UPDATE) {
    // action.data will be an updated course (obj)
    const nxt = [...state]
    const i = nxt.findIndex(course => course.id === action.data.id)
    nxt[i] = action.data
    return nxt
  }
  if (action.type === A.DELETE) {
    return [...action.data]
  }
  return state
}
