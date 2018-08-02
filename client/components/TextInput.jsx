import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

class TextInput extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}

    this.inputRef = React.createRef()

    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  componentDidMount() {
    this.inputRef.current.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    this.inputRef.current.removeEventListener('keydown', this.handleKeyDown)
  }

  handleKeyDown(e) {
    if (['Enter', 'Escape'].includes(e.key)) {
      e.stopPropagation()
      this.inputRef.current.blur()
    }
  }

  render() {
    const {
      name,
      label,
      placeholder,
      helperText,
      className,
      value,
      onChange,
      isRequired,
      ...props
    } = this.props
    return (
      <div {...props} className={classNames('clr-form-control', className)}>
        {label && <label className="clr-control-label">{label}</label>}
        <div className="clr-control-container">
          <div className="clr-input-wrapper">
            <input
              {...{
                name,
                value,
                placeholder,
                onChange,
              }}
              ref={this.inputRef}
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
}

TextInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  helperText: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  isRequired: PropTypes.bool,
}
TextInput.defaultProps = {}

export default TextInput
