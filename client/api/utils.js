import { actions as loadingActions } from 'dux/loading'

export const dispatchData = (type, data) => dispatch => {
  dispatch({ type, data })
}

export const mkAPIReq = ({ path, action, fakeData }) => {
  return dispatch => {
    // set loading state to true
    dispatch({ type: loadingActions.LOADING, context: action })

    if (fakeData) {
      const fake = new Promise(resolve => {
        setTimeout(() => {
          resolve(fakeData)
        }, 700)
      })
      return fake.then(data => {
        dispatch({ type: action, data })
        dispatch({ type: loadingActions.LOADED, context: action })
      })
    } else {
      // TODO: asdf (dean)
      // one day we'll have a real backend
    }
  }
}
