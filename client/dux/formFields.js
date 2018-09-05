// Actions
const LOAD = 'FORM_FIELDS_LOAD'

export const FORM_FIELDS = {
  LOAD,
}

// Reducers
export default (state = [], action) => {
  switch (action.type) {
    case LOAD: {
      return [...state, ...action.data]
    }
    default: {
      return state
    }
  }
}
