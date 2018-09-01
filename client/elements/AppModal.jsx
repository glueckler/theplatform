import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Modal from 'components/Modal'
import Button from 'components/Button'

class AppModal extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}

    this.handleCancel = this.handleCancel.bind(this)
  }

  handleCancel() {
    this.props.setEl({ open: false })
    if (this.props.el.onCancel) {
      this.props.el.onCancel()
    }
  }

  render() {
    if (!this.props.el.open) return null
    let { buttons, noCancel, ...rest } = this.props.el

    if (!noCancel) {
      buttons = (
        <>
          {buttons}
          <Button onClick={this.handleCancel} link>
            cancel
          </Button>
        </>
      )
    }

    const onCancel = this.handleCancel
    const props = {
      ...rest,
      buttons,
      onCancel,
      onKeyPress: this.handleKeyDown,
    }

    return <Modal {...props} />
  }
}

AppModal.propTypes = {
  setEl: PropTypes.func,
  el: PropTypes.shape({
    header: PropTypes.node,
    open: PropTypes.bool,
    buttons: PropTypes.node,
    noCancel: PropTypes.bool,
  }),
}
AppModal.defaultProps = {}

const mapState = state => ({
  el: state.elMODAL,
})

const mapDispatch = dispatch => ({
  setEl: state => {
    dispatch({ type: 'MODAL_SET_STATE', state })
  },
})

export default connect(
  mapState,
  mapDispatch
)(AppModal)
