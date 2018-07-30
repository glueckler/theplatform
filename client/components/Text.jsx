import React from 'react'
import PropTypes from 'prop-types'

import Y from 'yoots'
import classNames from 'classnames'

const Text = ({ variant, zeroMargin, ...props }) => {
  let RenderAs
  if (Y.startsWith('p', variant)) {
    RenderAs = 'p'
  }
  if (Y.startsWith('h', variant)) {
    RenderAs = variant
  }
  if (!RenderAs) {
    return <p {...props} />
  }

  let { className, style, ...rest } = props

  // although line height may still mess with alignment
  if (zeroMargin) {
    style = style || {}
    style.margin = 0
  }

  return (
    <RenderAs
      {...rest}
      className={classNames(variant, className)}
      style={{ ...style }}
    />
  )
}

Text.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.string,
  style: PropTypes.shape({}),
  zeroMargin: PropTypes.bool,
}
Text.defaultProps = {
  className: null,
  variant: null,
  style: null,
  zeroMargin: false,
}

export default Text
