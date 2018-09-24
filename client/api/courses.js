import { coursesActions as A } from 'dux/courses'
import { mkAPIReq } from 'api/utils'

export const getCourses = mkAPIReq({
  fakeData: require('client/examples/fakeCourses'),
  action: A.LOAD,
})

export const addCourse = ({ courseData }) =>
  mkAPIReq({ fakeData: courseData, action: A.CREATE })

export const updateCourse = ({ id, nxtCourse }) =>
  mkAPIReq({ fakeData: nxtCourse, action: A.UPDATE })

export const deleteCourse = ({ id, nxtCourses }) =>
  mkAPIReq({ fakeData: nxtCourses, action: A.DELETE })
