import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import colors from 'utils/colors'

import Text from 'components/Text'

// styled compoonents
let DropContainer
let ViewButton

class DropToggle extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
    this.handleToggleOpen = this.handleToggleOpen.bind(this)
  }

  handleToggleOpen() {
    this.setState({
      open: !this.state.open,
    })
  }

  render() {
    if (!DropContainer) {
      DropContainer = styled.div`
        padding-top: 0.5rem;
        max-height: ${props => (props.open ? '20rem' : '1.5rem')};
        border-bottom: 1px solid ${colors.darkBorder};
        overflow: hidden;
        transition: all 300ms ease-in-out;
        cursor: pointer;
      `
    }
    if (!ViewButton) {
      ViewButton = styled.div`
        span {
          margin-right: 0.1rem;
        }
        * {
          color: ${colors.linkBlue};
        }
      `
    }

    return (
      <DropContainer open={this.state.open} onClick={this.handleToggleOpen}>
        {/*    *   */}
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Text zeroMargin variant="p2">{this.props.header}</Text>
          <ViewButton>
            <span>View</span>
            <clr-icon
              shape="angle"
              style={{
                transform: `rotate(${this.state.open ? '0' : '-180'}deg)`,
                transition: 'all 300ms ease',
              }}
            />
          </ViewButton>
        </div>
        {/*    *    */}
        {/* Content */}
        {this.props.content}
      </DropContainer>
    )
  }
}

DropToggle.propTypes = {
  header: PropTypes.string,
  content: PropTypes.arrayOf(PropTypes.shape({})),
}
DropToggle.defaultProps = {}

export default DropToggle
