import React from 'react'
import PropTypes from 'prop-types'

const TextArea = ({
  value,
  onChange,
  helperText,
  placeholder,
  label,
  isRequired,
  ...props
}) => {
  return (
    <div className="clr-form-control">
      {label && <label className="clr-control-label">{label}</label>}
      <div className="clr-control-container">
        <div className="clr-textarea-wrapper">
          <textarea
            {...{
              value,
              placeholder,
              onChange,
            }}
            className="clr-textarea"
          />
          <clr-icon class="clr-validate-icon" shape="exclamation-circle" />
        </div>
        {helperText && <span className="clr-subtext">{helperText}</span>}
      </div>
    </div>
  )
}

TextArea.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  helperText: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  isRequired: PropTypes.bool,
}
TextArea.defaultProps = {
  value: '',
}

export default TextArea
