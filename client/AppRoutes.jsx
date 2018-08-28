import React from 'react'

import { Route } from 'react-router-dom'

import Login from 'elements/Login'
import FormEditor from 'elements/FormEditor'
import CourseIndex from 'elements/CourseIndex'

const AppRoutes = props => {
  return (
    <>
      <Route path="/login" component={Login} />
      <Route path="/forms" component={FormEditor} />
      <Route path="/courses" component={CourseIndex} />
    </>
  )
}

export default AppRoutes
