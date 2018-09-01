import React from 'react'
import PropTypes from 'prop-types'

const FullScreenCentered = ({ style, ...props }) => {
  return (
    <div
      {...props}
      style={{
        ...style,
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    />
  )
}

FullScreenCentered.propTypes = {}
FullScreenCentered.defaultProps = {}

export default FullScreenCentered
