import axios from 'axios'
import { dispatchData } from 'api/dispatch'
import { ACTIONS as A } from 'dux/index'

// get jokes

export const getJokes = dispatch => {
  axios.get('http://api.icndb.com/jokes/random/10').then(data => {
    dispatchData(dispatch, A.TEMPLATE.LOAD, data.data.value)
  })
}
