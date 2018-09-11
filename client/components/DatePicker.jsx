import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Flatpickr from 'react-flatpickr'
import 'flatpickr/dist/themes/airbnb.css'
import moment from 'moment'

class DatePicker extends PureComponent {
  constructor(props) {
    super(props)

    // binds
    this.handleOnChange = this.handleOnChange.bind(this)
  }

  handleOnChange(date) {
    
    // call the function if it isn't undefined
    this.props.onChange?.call(this, date)
  }

  render() {
    const {
      label,
      helperText,
      className,
      value,
      onChange,
      isRequired,
      fullWidth,
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
            <Flatpickr
              options={{
                clickOpens: true,
              }}
              value={value}
              onChange={this.handleOnChange}
            />
          </div>
          {helperText && <span className="clr-subtext">Helper Text</span>}
        </div>
      </div>
    )
  }
}

DatePicker.propTypes = {
  label: PropTypes.string,
  helperText: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.shape({}),
  onChange: PropTypes.func,
  isRequired: PropTypes.bool,
  fullWidth: PropTypes.bool,
}
DatePicker.defaultProps = {
  value: new Date(),
}

export default DatePicker
