import React from 'react'
import PropTypes from 'prop-types'

import { pick } from 'yoots'

export const Checkbox = ({ label, ...props }) => {
  return (
    <div className="checkbox">
      <input
        type="checkbox"
        {...pick(props, ['value', 'checked', 'onChange'])}
        id={props.value}
      />
      <label htmlFor={props.value}>{label}</label>
    </div>
  )
}

// see "Radios" component for what's going on here..
const CHECKBOX_TYPE = 'Checkbox'
Checkbox.componentTypeName = CHECKBOX_TYPE

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
}

const Checkboxes = ({ label, children, onChange, values, ...props }) => {
  return (
    <div className="clr-form-control">
      {label && <label className="clr-control-label">{label}</label>}
      <div className="clr-control-container">
        {React.Children.map(children, child => {
          if (child.type && child.type.componentTypeName === CHECKBOX_TYPE) {
            const checked = (() => {
              if (values === undefined) return
              return (values || []).includes(child.props.value)
            })()
            return React.cloneElement(<Checkbox {...child.props} />, {
              onChange: e => {
                onChange(e, checked)
              },
              checked,
            })
          }
          return null
        })}
      </div>
    </div>
  )
}

Checkboxes.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  onChange: PropTypes.func,
  values: PropTypes.arrayOf(PropTypes.string),
  label: PropTypes.string,
}
Checkboxes.defaultProps = {
  onChange: () => {},
}

export default Checkboxes
