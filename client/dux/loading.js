export const actions = {
  LOADING: 'LOADING',
  LOADED: 'LOADED',
}

export default (state = {}, action) => {
  if (action.type === actions.LOADING) {
    return { ...state, [action.context]: true }
  }
  if (action.type === actions.LOADED) {
    const nxtState = { ...state }
    delete nxtState[action.context]
    return nxtState
  }
  return state
}
