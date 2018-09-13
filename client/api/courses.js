import { dispatchData } from './utils'
import { coursesActions as A } from 'dux/courses'

export const getCourses = dispatch => {
  const fake = new Promise(resolve => {
    setTimeout(() => {
      resolve(require('client/examples/fakeCourses'))
    }, 800)
  })
  return fake.then(data => {
    dispatch(dispatchData(A.LOAD, data))
  })
}

export const addCourse = ({ courseData }) => dispatch => {
  const fake = new Promise(resolve => {
    setTimeout(() => {
      resolve(courseData)
    }, 500)
  })

  fake.then(data => {
    dispatch(dispatchData(A.CREATE, data))
  })
}

export const updateCourse = ({ id, nxtCourse }) => dispatch => {
  const fake = new Promise(resolve => {
    setTimeout(() => {
      resolve(nxtCourse)
    }, 500)
  })

  fake.then(data => {
    dispatch(dispatchData(A.UPDATE, data))
  })
}

export const deleteCourse = ({ id, nxtCourses }) => dispatch => {
  const fake = new Promise(resolve => {
    setTimeout(() => {
      resolve(nxtCourses)
    }, 500)
  })

  return fake.then(data => {
    dispatch(dispatchData(A.DELETE, data))
  })
}
