import React from 'react'
import PropTypes from 'prop-types'

import { Route } from 'react-router-dom'

import Login from 'elements/Login'
import FormEditor from 'elements/FormEditor'

const AppRoutes = props => {
  return (
    <>
      <Route path="/" component={Login} />
      <Route path="/forms" component={FormEditor} />
    </>
  )
}

AppRoutes.propTypes = {}
AppRoutes.defaultProps = {}

export default AppRoutes
