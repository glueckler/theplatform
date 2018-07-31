import React from 'react'
import PropTypes from 'prop-types'

import { pick } from 'yoots'

export const RadioOption = ({ label, ...props }) => {
  return (
    <div className="radio">
      <input
        type="radio"
        {...pick(props, ['id', 'name', 'checked', 'onChange'])}
      />
      <label htmlFor={props.id}>{label}</label>
    </div>
  )
}

RadioOption.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

const Radios = ({ children, onChange, value, defaultValue, ...props }) => {
  return (
    <form {...pick(props, ['onChange'])}>
      <section className="form-block">
        {React.Children.map(children, child => {
          if (child.type && child.type.name === 'RadioOption') {
            return React.cloneElement(<RadioOption {...child.props} />, {
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

Radios.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  defaultValue: PropTypes.string.isRequired,
}
Radios.defaultProps = {}

export default Radios
