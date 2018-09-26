import React from 'react'
import PropTypes from 'prop-types'

import { pick } from 'yoots'

export const RadioOption = function({ label, ...props }) {
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

// we need to identify RadioOption in the future
// using child.type.name property doesn't work when webpack changes
// the Component name from "RadioOption" to "c" for example
const OPTION_TYPE_NAME = 'RadioOption'
// properties attached to the Component will be accessible un the "type" of each child
RadioOption.componentTypeName = OPTION_TYPE_NAME

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
          if (child.type.componentTypeName === OPTION_TYPE_NAME) {
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
