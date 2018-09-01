import React from 'react'
import PropTypes from 'prop-types'

import { pick } from 'yoots'

export const RadioOption = ({ label, ...props }) => {
  return (
    <div className="radio">
      <input
        type="radio"
        id={props.value}
        {...pick(props, [
          'name',
          'defaultChecked',
          'value',
          'checked',
          'onChange',
        ])}
      />
      <label htmlFor={props.value}>{label}</label>
    </div>
  )
}

RadioOption.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
}

const Radios = ({
  label,
  children,
  onChange,
  value,
  defaultChecked,
  name,
  ...props
}) => {
  return (
    <div className="clr-form-control">
      {label && <label className="clr-control-label">{label}</label>}
      <div className="clr-control-container">
        {React.Children.map(children, child => {
          if (child.type && child.type.name === 'RadioOption') {
            const checked = (() => {
              if (value === undefined) return
              child.props.value === value
            })()
            return React.cloneElement(<RadioOption {...child.props} />, {
              onChange,
              checked,
              name,
              defaultChecked: child.props.value === defaultChecked,
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
  onChange: PropTypes.func,
  value: PropTypes.string,
  label: PropTypes.string,
  // only necessary for uncontrolled radios
  defaultChecked: PropTypes.string,
  // name of all radios in a group (so one is selected at a time)
  name: PropTypes.string,
}
Radios.defaultProps = {}

export default Radios
