import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Flex extends PureComponent {
  render() {
    const {
      style,
      spaceBetween,
      justifyCenter,
      spaceAround,
      centerItems,
      centerContent,
      column,
      flexEnd,
      ...props
    } = this.props

    //
    // justifyContent
    //
    if (spaceBetween) {
      style.justifyContent = 'space-between'
    }
    if (spaceAround) {
      style.justifyContent = 'space-around'
    }
    if (flexEnd) {
      style.justifyContent = 'flex-end'
    }
    if (justifyCenter) {
      style.justifyContent = 'center'
    }

    //
    // alignItems
    //
    if (centerItems) {
      style.alignItems = 'center'
    }
    if (centerContent) {
      style.alignContent = 'center'
    }

    //
    // flex direction
    //
    if (column) {
      style.flexDirection = 'column'
    }

    return <div style={{ display: 'flex', ...style }} {...props} />
  }
}

Flex.propTypes = {
  style: PropTypes.shape({}),
  spaceBetween: PropTypes.bool,
  centerItems: PropTypes.bool,
  flexEnd: PropTypes.bool,
  justifyCenter: PropTypes.bool,
  centerContent: PropTypes.bool,
  column: PropTypes.bool,
  spaceAround: PropTypes.bool,
}
Flex.defaultProps = {
  style: {},
}

export default Flex
