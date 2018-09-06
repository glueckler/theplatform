import { dispatchData } from './utils'
import { coursesActions as A } from 'dux/courses'

export const getCourses = dispatch => {
  const fake = new Promise(resolve => {
    setTimeout(() => {
      resolve(require('client/examples/fakeCourses'))
    }, 800)
  })
  fake.then(data => {
    dispatch(dispatchData(A.LOAD, data))
  })
}
