import axios from 'axios'
import { dispatchData } from './utils'
import { registrantsActions as A } from 'dux/registrants'

// Form Fields
export const getRegistrants = dispatch => {
  const fake = new Promise(resolve => {
    setTimeout(() => {
      resolve(require('client/examples/fakeRegistrants.js'))
    }, 800)
  })

  fake.then(data => {
    dispatch(dispatchData(A.LOAD, data))
  })
}
