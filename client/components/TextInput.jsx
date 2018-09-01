import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styled from 'styled-components'

const StyledInput = styled.input`
  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px yellow inset;
  }
`

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
      inputStyle,
      fullWidth,
      type = 'text',
      ...props
    } = this.props
    return (
      <div
        {...props}
        className={classNames(
          'clr-form-control',
          { ['full-width']: fullWidth },
          className
        )}
      >
        {label && (
          <label
            className={classNames('clr-control-label', {
              ['full-width']: fullWidth,
            })}
          >
            {label}
          </label>
        )}
        <div
          className={classNames('clr-control-container', {
            ['full-width']: fullWidth,
          })}
        >
          <div
            className={classNames('clr-input-wrapper', {
              ['full-width']: fullWidth,
            })}
          >
            <StyledInput
              {...{
                name,
                value,
                placeholder,
                onChange,
              }}
              style={{ ...inputStyle }}
              innerRef={this.inputRef}
              type={type}
              className={classNames('clr-input', {
                ['full-width']: fullWidth,
              })}
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
  type: PropTypes.string,
  inputStyle: PropTypes.shape({}),
  fullWidth: PropTypes.bool,
}
TextInput.defaultProps = {}

export default TextInput
