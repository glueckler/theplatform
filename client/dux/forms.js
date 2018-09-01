// Actions
const LOAD = 'FORMS_LOAD'

export const FORMS = {
  LOAD,
}

// Reducers
export default (state = {}, action) => {
  switch (action.type) {
    case LOAD: {
      return { ...state, forms: action.data }
    }
    default: {
      return state
    }
  }
}
