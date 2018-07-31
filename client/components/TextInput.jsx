import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const TextInput = ({
  label,
  placeholder,
  helperText,
  className,
  value,
  onChange,
  ...props
}) => {
  return (
    <div {...props} className={classNames('clr-form-control', className)}>
      {label && <label className="clr-control-label">{label}</label>}
      <div className="clr-control-container">
        <div className="clr-input-wrapper">
          <input
            {...{
              value,
              placeholder,
              onChange,
            }}
            type="text"
            className="clr-input"
          />
          <clr-icon class="clr-validate-icon" shape="exclamation-circle" />
        </div>
        {helperText && <span className="clr-subtext">Helper Text</span>}
      </div>
    </div>
  )
}

TextInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  helperText: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
}
TextInput.defaultProps = {
  value: '',
}

export default TextInput
