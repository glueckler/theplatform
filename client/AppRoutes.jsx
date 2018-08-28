import React from 'react'

import { Route } from 'react-router-dom'

import Login from 'elements/Login'
import FormEditor from 'elements/FormEditor'

const AppRoutes = props => {
  return (
    <>
      <Route path="/login" component={Login} />
      <Route path="/forms" component={FormEditor} />
    </>
  )
}

export default AppRoutes
