import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import classNames from 'classnames'

class Button extends PureComponent {
  render() {
    const { style, link, small, primary, danger, ...props } = this.props
    const moreProps = { ...props, type: 'button' } // adding type="button" prevents page reload on click
    if (link) {
      return (
        <button
          {...moreProps}
          className={classNames('btn btn-link', { ['btn-sm']: small })}
          style={{
            ...style,
            // if the danger prop is passed the color will be added to style
            ...(danger ? { color: '#C92100' } : {}),
          }}
        />
      )
    }
    return (
      <button
        {...moreProps}
        className={classNames(
          'btn',
          { ['btn-primary']: primary },
          { ['btn-sm']: small }
        )}
      />
    )
  }
}

Button.propTypes = {
  link: PropTypes.bool,
  small: PropTypes.bool,
  primary: PropTypes.bool,
  danger: PropTypes.bool,
  style: PropTypes.shape({}),
}
Button.defaultProps = {
  link: null,
  small: null,
  primary: null,
}

export default Button
