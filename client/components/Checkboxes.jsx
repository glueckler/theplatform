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

Checkbox.proptypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
}

const Checkboxes = ({ label, children, onChange, values, ...props }) => {
  return (
    <div className="clr-form-control">
      {label && <label className="clr-control-label">{label}</label>}
      <div className="clr-control-container">
        {React.Children.map(children, child => {
          if (child.type && child.type.name === 'Checkbox') {
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
  onChange: PropTypes.func.isRequired,
  values: PropTypes.arrayOf(PropTypes.string),
  label: PropTypes.string,
}
Checkboxes.defaultProps = {}

export default Checkboxes
