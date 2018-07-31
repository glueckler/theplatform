import React from 'react'
import PropTypes from 'prop-types'

const Modal = ({ open, header, content, footer, onCancel, ...props }) => {
  if (!open) return null
  return (
    <>
      <div className="modal">
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
            {footer && <div className="modal-footer">{footer}</div>}
          </div>
        </div>
      </div>
      <div className="modal-backdrop" aria-hidden="true" />
    </>
  )
}

Modal.propTypes = {}
Modal.defaultProps = {}

export default Modal
