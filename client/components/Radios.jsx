import React from 'react'
import PropTypes from 'prop-types'

import { pick } from 'yoots'

export const RadioOption = ({ label, ...props }) => {
  return (
    <div className="radio">
      <input
        type="radio"
        id={props.value}
        {...pick(props, ['value', 'checked', 'onChange'])}
      />
      <label htmlFor={props.value}>{label}</label>
    </div>
  )
}

RadioOption.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
}

const Radios = ({ label, children, onChange, value, ...props }) => {
  return (
    <div className="clr-form-control">
      {label && <label className="clr-control-label">{label}</label>}
      <div className="clr-control-container">
        {React.Children.map(children, child => {
          if (child.type && child.type.name === 'RadioOption') {
            return React.cloneElement(<RadioOption {...child.props} />, {
              onChange,
              checked: child.props.value === value,
            })
          }
          return null
        })}
      </div>
    </div>
  )
}

Radios.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  label: PropTypes.string,
}
Radios.defaultProps = {}

export default Radios
