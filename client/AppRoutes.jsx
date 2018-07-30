import React from 'react'
import PropTypes from 'prop-types'

import { Route } from 'react-router-dom'

import FormEditor from 'elements/FormEditor'

const AppRoutes = props => {
  return (
    <>
      <Route path="/" component={FormEditor} />
    </>
  )
}

AppRoutes.propTypes = {}
AppRoutes.defaultProps = {}

export default AppRoutes
