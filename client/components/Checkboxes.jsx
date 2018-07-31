import React from 'react'
import PropTypes from 'prop-types'

import { pick } from 'yoots'

export const Checkbox = ({ label, ...props }) => {
  return (
    <div className="checkbox">
      <input
        type="checkbox"
        {...pick(props, ['id', 'name', 'checked', 'onChange'])}
      />
      <label htmlFor={props.id}>{label}</label>
    </div>
  )
}

Checkbox.proptypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

const Checkboxes = ({ children, onChange, value, defaultValue, ...props }) => {
  return (
    <form {...pick(props, ['onChange'])}>
      <section className="form-block">
        {React.Children.map(children, child => {
          if (child.type && child.type.name === 'Checkbox') {
            return React.cloneElement(<Checkbox {...child.props} />, {
              onChange,
              checked:
                child.props.name === value ||
                (!value && child.props.name === defaultValue),
            })
          }
          return child
        })}
      </section>
    </form>
  )
}

Checkboxes.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  defaultValue: PropTypes.string.isRequired,
}
Checkboxes.defaultProps = {}

export default Checkboxes
