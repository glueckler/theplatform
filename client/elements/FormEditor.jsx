import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import Text from 'components/Text'
import Flex from 'components/Flex'
import Button from 'components/Button'
import Modal from 'components/Modal'
import Radios, { RadioGroupLabel, RadioOption } from 'components/Radios'
import Checkboxes, { Checkbox } from 'components/Checkboxes'

const AddField = styled.div`
  position: relative;
  height: ${props => (props.open ? '40px' : '10px')};
  transition: all 100ms ease-in-out;
  overflow: hidden;
  display: flex;
  align-items: center;
  &:hover {
    height: 40px;
    background: #dff0d0;
  }
`
class FormEditor extends Component {
  constructor(props) {
    super(props)
    props.setEl({
      addFieldModalOpen: false,
      formTitle: 'Example Form',
    })

    this.setEl = props.setEl

    this.handleOpenAddFieldModal = this.handleOpenAddFieldModal.bind(this)
    this.handleCloseAddFieldModal = this.handleCloseAddFieldModal.bind(this)
  }

  handleOpenAddFieldModal() {
    this.setEl({ addFieldModalOpen: true })
  }

  handleCloseAddFieldModal() {
    this.setEl({ addFieldModalOpen: false })
  }

  handleAddCustomField() {
    return
  }

  renderAddFieldModal() {
    const props = {
      header: <>Create Custom Form Field</>,
      open: this.props.el.addFieldModalOpen,
      onCancel: this.handleCloseAddFieldModal,
      footer: (
        <>
          <Button onClick={this.handleAddCustomField}>add</Button>
          <Button onClick={this.handleCloseAddFieldModal} link>
            cancel
          </Button>
        </>
      ),
    }
    return <Modal {...props} />
  }

  render() {
    return (
      <>
        {this.renderAddFieldModal()}
        <div
          style={{ width: '100vw', display: 'flex', justifyContent: 'center' }}
        >
          <div style={{ width: '440px' }}>
            {/* Form Title */}
            {/* -   -   -   -   -   - */}
            <Flex spaceBetween centerItems>
              <Text zeroMargin variant="h3" style={{ lineHeight: '2rem' }}>
                {this.props.el.formTitle}
              </Text>
              <Button link>Edit Name</Button>
            </Flex>
            {/* Form Fields */}
            {/* -   -   -   -   -   - */}

            <Radios
              defaultValue="radio"
              onChange={e => {
                alert(e.target.name)
              }}
            >
              <label>These are radios</label>
              <RadioOption label="this is a label" name="radio2" id="radio2" />
              <RadioOption
                label="this is another label"
                name="radio"
                id="radio"
              />
            </Radios>
            <Checkboxes
              defaultValue="none"
              onChange={e => {
                alert(e.target.name)
              }}
            >
              <label>Check box group lable</label>
              <Checkbox label="my first checkbox" name="check1" id="check1" />
            </Checkboxes>
            {/* Add Field */}
            {/* -   -   -   -   -   - */}
            <AddField
              open
              onClick={e => {
                this.handleOpenAddFieldModal()
              }}
            >
              <Text
                zeroMargin
                variant="p3"
                style={{ position: 'absolute', top: '8px' }}
              >
                Add form field
              </Text>
            </AddField>
          </div>
        </div>
      </>
    )
  }
}

FormEditor.propTypes = {
  setEl: PropTypes.func.isRequired,
  el: PropTypes.shape({
    formTitle: PropTypes.string,
  }).isRequired,
}
FormEditor.defaultProps = {}

const mapState = state => ({
  el: state.elFE,
})
const mapDispath = dispatch => ({
  setEl: state => {
    dispatch({ type: 'FE_SET_STATE', state })
  },
})

export default connect(
  mapState,
  mapDispath
)(FormEditor)
