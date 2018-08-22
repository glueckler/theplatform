import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Flex extends PureComponent {
  render() {
    let { style, spaceBetween, centerItems, flexEnd, ...props } = this.props

    //
    // justifyContent
    //
    if (spaceBetween) {
      style.justifyContent = 'space-between'
    }
    if (flexEnd) {
      style.justifyContent = 'flex-end'
    }

    //
    // alignItems
    //
    if (centerItems) {
      style.alignItems = 'center'
    }

    return <div style={{ display: 'flex', ...style }} {...props} />
  }
}

Flex.propTypes = {
  style: PropTypes.shape({}),
  spaceBetween: PropTypes.bool,
  centerItems: PropTypes.bool,
  flexEnd: PropTypes.bool,
}
Flex.defaultProps = {
  style: {},
}

export default Flex
