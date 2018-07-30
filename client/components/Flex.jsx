import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Flex extends PureComponent {
  render() {
    let { style, ...props } = this.props

    //
    // justifyContent
    //
    if (this.props.spaceBetween) {
      style.justifyContent = 'space-between'
    }

    //
    // alignItems
    //
    if (this.props.centerItems) {
      style.alignItems = 'center'
    }

    return <div style={{ display: 'flex', ...style }} {...props} />
  }
}

Flex.propTypes = {
  style: PropTypes.shape({}),
  spaceBetween: PropTypes.bool,
  centerItems: PropTypes.bool,
}
Flex.defaultProps = {
  style: {},
}

export default Flex
