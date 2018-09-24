import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class Loading extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      animationFrame: 0,
    }

    this.animations = ['.', '..', '...']
    setInterval(() => {
      let animationFrame = this.state.animationFrame + 1
      if (animationFrame > 2) animationFrame = 0
      this.setState({ animationFrame })
    }, 400)
  }

  render() {
    return (
      Object.keys(this.props.loading).length > 0 && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            background: 'rgba(0, 0, 0, .3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <p style={{ color: '#fff', fontSize: '2em' }}>
            {`Loading${this.animations[this.state.animationFrame]}`}
          </p>
        </div>
      )
    )
  }
}

Loading.propTypes = {
  loading: PropTypes.shape({}).isRequired,
}
Loading.defaultProps = {}

const mapState = state => ({
  loading: state.loading,
})

export default connect(mapState)(Loading)
