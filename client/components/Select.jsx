import React from 'react'
import PropTypes from 'prop-types'

export const SelectOption = props => <option {...props} />

SelectOption.propTypes = {
  value: PropTypes.string.isRequired,
}

const Select = ({
  onChange,
  children,
  options,
  label,
  value,
  defaultValue,
  ...props
}) => {
  return (
    <div className="clr-form-control">
      {label && <label className="clr-control-label">{label}</label>}
      <div className="clr-control-container">
        <div className="select">
          <select {...{ value, defaultValue, onChange }}>{children}</select>
        </div>
      </div>
    </div>
  )
}

Select.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  label: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  options: PropTypes.array,
  defaultValue: PropTypes.string,
}
Select.defaultProps = {}

export default Select
