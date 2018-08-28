import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import Text from 'components/Text'
import Flex from 'components/Flex'

// styled components cache
let Nav
let DarkOverlay
let NavHeader
let Title
let ArrowIcon
let LinkIcon

const closedNavWidth = '57px'

class AppNav extends PureComponent {
  constructor(props) {
    super(props)

    this.setEl = props.setEl

    this.setEl({
      navOpen: false,
      showOverlay: false,
    })

    this.handleToggleOpen = this.handleToggleOpen.bind(this)
  }

  handleToggleOpen() {
    const navOpen = !this.props.el.navOpen
    this.setEl({
      navOpen,
    })

    if (!navOpen) {
      setTimeout(() => {
        this.setEl({ showOverlay: this.props.el.navOpen })
      }, 400)
    } else {
      this.setEl({ showOverlay: true })
    }
  }

  render() {
    const loggedIn = true

    if (!loggedIn) return null

    const navOpen = this.props.el.navOpen

    return (() => {
      if (!Nav) {
        Nav = styled.div`
          position: fixed;
          z-index: 100;
          background: white;
          height: 100vh;
          width: ${props => (props.navOpen ? '312px' : closedNavWidth)};
          box-shadow: 0px 8px 10px -5px rgba(0, 0, 0, 0.2),
            0px 16px 24px 2px rgba(0, 0, 0, 0.14),
            0px 6px 30px 5px rgba(0, 0, 0, 0.12);
          transition: all 300ms ease;
          overflow: hidden;
        `
      }
      if (!DarkOverlay) {
        DarkOverlay = styled.div`
          position: fixed;
          z-index: 10;
          top: 0;
          right: ${props => (props.showOverlay ? '0' : 'unset')};
          bottom: 0;
          left: 0;
          opacity: ${props => (props.navOpen ? '1' : '0')}
          will-change: opacity;
          background-color: rgba(0, 0, 0, 0.5);
          transition: opacity 300ms ease;
        `
      }
      if (!NavHeader) {
        NavHeader = styled.div`
          width: 100%;
          display: flex;
          justify-content: space-between;
          padding: 10px;
          over-flow
        `
      }
      if (!Title) {
        Title = styled.span`
          position: relative;
          font-size: 1.2rem;
          width: ${props => (props.navOpen ? '200px' : '0')};
          white-space: nowrap;
          overflow: hidden;
          transition: all 300ms ease;
        `
      }
      if (!ArrowIcon) {
        ArrowIcon = styled.div`
          display: inline-block;
          transform: rotate(${props => (props.navOpen ? '-90' : '90')}deg);
          transform-origin: center;
          transition: transform 300ms ease;
        `
      }
      if (!LinkIcon) {
        LinkIcon = styled.div`
          display: inline-block;
          flex: 0 0 ${closedNavWidth};
          display: flex;
          justify-content: center;
        `
      }
      return (
        <>
          <DarkOverlay
            navOpen={this.props.el.navOpen}
            showOverlay={this.props.el.showOverlay}
            onClick={this.handleToggleOpen}
          />
          <Nav navOpen={navOpen}>
            <NavHeader>
              <Title navOpen={navOpen}>
                The Platform
                <div
                  style={{
                    background: !this.props.el.navOpen
                      ? `linear-gradient(
                          to right,
                          rgba(255, 255, 255, 0) 0%,
                          rgba(255, 255, 255, 0) 75%,
                          rgba(255, 255, 255, 1) 100%
                        )`
                      : 'none',
                    position: 'absolute',
                    top: '0',
                    bottom: '0',
                    left: '0',
                    right: '0',
                  }}
                />
              </Title>
              <ArrowIcon onClick={this.handleToggleOpen} navOpen={navOpen}>
                <clr-icon shape="angle" size="32" />
              </ArrowIcon>
            </NavHeader>
            <div style={{ marginTop: '60px' }}>
              {[
                { linkName: 'Courses', iconName: 'certificate' },
                { linkName: 'Forms', iconName: 'checkbox-list' },
                { linkName: 'Payment Dash', iconName: 'dollar-bill' },
              ].map(nav => {
                return (
                  <Flex
                    key={nav.linkName}
                    spaceBetween
                    centerItems
                    style={{
                      height: '51px',
                      borderBottom: '1px solid #9a9a9a',
                      position: 'relative',
                    }}
                    className="link-hover"
                  >
                    <div
                      style={{
                        background: !this.props.el.navOpen
                          ? `linear-gradient(
                          to right,
                          rgba(255, 255, 255, 0) 0%,
                          rgba(255, 255, 255, 0) 75%,
                          rgba(255, 255, 255, 1) 100%
                        )`
                          : 'none',
                        position: 'absolute',
                        top: '0',
                        bottom: '0',
                        left: '0',
                        right: '0',
                      }}
                    />

                    <LinkIcon>
                      <clr-icon shape={nav.iconName} size="32" />
                    </LinkIcon>
                    <Text
                      zeroMargin
                      variant="h3"
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      {nav.linkName}
                    </Text>
                  </Flex>
                )
              })}
            </div>
          </Nav>
        </>
      )
    })()
  }
}

AppNav.propTypes = {
  setEl: PropTypes.func,
  el: PropTypes.shape({
    navOpen: PropTypes.bool,
    showOverlay: PropTypes.bool,
  }),
}
AppNav.defaultProps = {}

const mapState = state => ({
  el: state.elAPP_NAV,
})

const mapDispatch = dispatch => ({
  setEl: state => {
    dispatch({ type: 'APP_NAV_SET_STATE', state })
  },
})

export default connect(
  mapState,
  mapDispatch
)(AppNav)
