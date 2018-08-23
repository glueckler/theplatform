import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Modal extends Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  handleKeyDown(e) {
    if (e.keyCode === 27 && this.props.onCancel) {
      this.props.onCancel()
    }
  }

  render() {
    if (!this.props.open) return null
    const {
      open,
      header,
      content,
      buttons,
      onCancel,
      className,
      style,
      ...props
    } = this.props
    return (
      <>
        <div {...props} className={`modal${(className && ' ') || ''}`}>
          <div className="modal-dialog" role="dialog" aria-hidden="true">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  onKeyPress={onCancel}
                  aria-label="Close"
                  className="close"
                  type="button"
                >
                  <clr-icon aria-hidden="true" shape="close" />
                </button>
                {header && <h3 className="modal-title">{header}</h3>}
              </div>
              {content && <div className="modal-body">{content}</div>}
              {buttons && <div className="modal-footer">{buttons}</div>}
            </div>
          </div>
        </div>
        <div className="modal-backdrop" aria-hidden="true" />
      </>
    )
  }
}

Modal.propTypes = {
  open: PropTypes.bool,
  header: PropTypes.node,
  content: PropTypes.node,
  buttons: PropTypes.node,
  onCancel: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.shape({}),
}
Modal.defaultProps = {}

export default Modal
