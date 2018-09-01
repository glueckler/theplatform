import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

// styled component cache
let MenuColumn
let DisplayColumn
let FullPage

class BasicLayout extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <>
        {(() => {
          FullPage =
            FullPage ||
            styled.div`
              display: flex;
              padding-top: 86px;
              padding-bottom: 80px;
            `
        })()}
        <FullPage>
          {/* -   -   -   -   -   -   */}
          {(() => {
            MenuColumn =
              MenuColumn ||
              styled.div`
                margin-left: 117px;
                flex: 0 0 267px;
                overflow: hidden;
              `
          })()}
          <MenuColumn>{this.props.menuChildren}</MenuColumn>
          {/* -   -   -   -   -   -   */}
          {(() => {
            DisplayColumn =
              DisplayColumn ||
              styled.div`
                flex: 0 0 500px;
                overflow: hidden;
                margin-left: 95px;
              `
          })()}
          <DisplayColumn>{this.props.displayChildren}</DisplayColumn>
        </FullPage>
      </>
    )
  }
}

BasicLayout.propTypes = {
  displayChildren: PropTypes.node,
  menuChildren: PropTypes.node,
}
BasicLayout.defaultProps = {}

export default BasicLayout
