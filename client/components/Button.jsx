import React from 'react'
import PropTypes from 'prop-types'

import classNames from 'classnames'

const Button = ({ link, small, primary, ...props }) => {
  if (link) {
    return (
      <button
        {...props}
        className={classNames('btn btn-link', { ['btn-sm']: small })}
      />
    )
  }
  return (
    <button
      {...props}
      className={classNames(
        'btn',
        { ['btn-primary']: primary },
        { ['btn-sm']: small }
      )}
    />
  )
}

Button.propTypes = {
  link: PropTypes.bool,
  small: PropTypes.bool,
  primary: PropTypes.bool,
}
Button.defaultProps = {
  link: null,
  small: null,
  primary: null,
}

export default Button
