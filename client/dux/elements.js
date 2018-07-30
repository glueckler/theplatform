const stateReducers = {}
const componentState = element => {
  const setStateAction = `${element.toUpperCase()}_SET_STATE`
  const containerKey = `el${element}`
  const reducer = (state = {}, action) => {
    switch (action.type) {
      case setStateAction: {
        return { ...state, ...action.state }
      }
      default: {
        return state
      }
    }
  }
  stateReducers[containerKey] = reducer
}

const containers = ['APITest', 'FE']
containers.forEach(element => {
  componentState(element)
})

export default stateReducers
