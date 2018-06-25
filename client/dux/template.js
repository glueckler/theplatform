// Actions
const LOAD = 'TEMPLATE_LOAD'

// Reducers
export default (state = {}, action) => {
  switch (action.type) {
    case LOAD: {
      return { ...state, templateData: action.data }
    }
    default: {
      return state
    }
  }
}
