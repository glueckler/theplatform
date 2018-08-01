import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import Text from 'components/Text'
import Flex from 'components/Flex'
import Button from 'components/Button'
import Modal from 'components/Modal'
import Radios, { RadioOption } from 'components/Radios'
import Checkboxes, { Checkbox } from 'components/Checkboxes'
import TextInput from 'components/TextInput'
import TextArea from 'components/TextArea'
import Select, { SelectOption } from 'components/Select'

const AddField = styled.div`
  position: relative;
  height: ${props => (props.open ? '40px' : '10px')};
  transition: all 100ms ease-in-out;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    height: 40px;
    background: #dff0d0;
  }
`
class FormEditor extends Component {
  constructor(props) {
    super(props)
    // set to empty obj so lookup values are undefined instead of null
    // will not be necessary once state isn't used after testing purposes
    this.state = {}
    props.setEl({
      addFieldModalOpen: false,
      formTitle: 'Example Form',
      formFields: [
        {
          label: 'select field test',
          inputType: 'select',
          options: ['option1', 'option2', 'option3'],
          placeholder: 'option2',
          formID: 'abc',
          isRequired: true,
          position: 3,
        },
        {
          label: 'text input field test',
          inputType: 'textinput',
          options: undefined,
          placeholder: 'placeholder test',
          formID: 'abcd',
          isRequired: true,
          position: 2,
        },
        {
          label: 'text area field test',
          inputType: 'textarea',
          options: undefined,
          placeholder: 'placeholder test',
          formID: 'abce',
          isRequired: true,
          position: 1,
        },
        {
          label: 'Radios field test',
          inputType: 'radio',
          options: ['radio option1', 'carls jr', 'carls sr'],
          placeholder: 'carls sr',
          formID: 'abcx',
          isRequired: true,
          position: 4,
        },
        {
          label: 'Checkboxes field test',
          inputType: 'checkbox',
          options: ['Check mate', 'Check Pleaaaase', 'Check yo self'],
          placeholder: 'Check mate',
          formID: 'ax',
          isRequired: true,
          position: 4,
        },
      ],
    })

    this.INPUT_TYPES = {
      SELECT: 'select',
      TEXTAREA: 'textarea',
      TEXTINPUT: 'textinput',
      RADIO: 'radio',
      CHECKBOX: 'checkbox',
    }

    this.setEl = props.setEl

    this.handleOpenAddFieldModal = this.handleOpenAddFieldModal.bind(this)
    this.handleCloseAddFieldModal = this.handleCloseAddFieldModal.bind(this)
    this.handleOpenEditNameModal = this.handleOpenEditNameModal.bind(this)
    this.handleCloseEditNameModal = this.handleCloseEditNameModal.bind(this)
  }

  handleOpenAddFieldModal() {
    this.setEl({ addFieldModalOpen: true })
  }

  handleCloseAddFieldModal() {
    this.setEl({ addFieldModalOpen: false })
  }

  handleOpenEditNameModal() {
    this.setEl({
      editNameModalOpen: true,
    })
  }

  handleCloseEditNameModal() {
    this.setEl({
      editNameModalOpen: false,
    })
  }

  handleAddCustomField() {
    return
  }

  get modalProps() {
    //
    // add field modal
    //
    if (this.props.el.addFieldModalOpen) {
      return {
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
    }
    //
    // edit form name modal
    //
    if (this.props.el.editNameModalOpen) {
      return {
        header: <>Change Form Name</>,
        open: this.props.el.editNameModalOpen,
        onCancel: this.handleCloseEditNameModal,
        footer: (
          <>
            <Button onClick={this.handle}>save</Button>
            <Button onClick={this.handleCloseEditNameModal} link>
              cancel
            </Button>
          </>
        ),
      }
    }
  }

  renderAddFieldButton(open) {
    return (
      <AddField
        open={open}
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
    )
  }

  renderFields() {
    return (this.props.el.formFields || []).map(field => {
      const disabledOnChange = () => {
        alert('Form Fields are not active during Form Editing')
      }
      const genericProps = {
        label: field.label,
        isRequired: field.isRequired,
        onChange: disabledOnChange,
        key: field.formID,
      }

      const T = this.INPUT_TYPES
      const fT = field.inputType
      let RenderType
      let props
      let children
      if (fT === T.SELECT) {
        RenderType = Select
        props = {
          value: field.placeholder,
        }
        children = (field.options || []).map(option => (
          <SelectOption key={option} value={option}>
            {option}
          </SelectOption>
        ))
      }
      if (fT === T.TEXTAREA) {
        RenderType = TextArea
        props = {
          placeholder: field.placeholder,
        }
      }
      if (fT === T.TEXTINPUT) {
        RenderType = TextInput
        props = {
          placeholder: field.placeholder,
        }
      }
      if (fT === T.RADIO) {
        RenderType = Radios
        props = {
          value: field.placeholder,
        }
        children = (field.options || []).map(option => (
          <RadioOption label={option} key={option} value={option} />
        ))
      }
      if (fT === T.CHECKBOX) {
        RenderType = Checkboxes
        props = {
          value: field.placeholder,
        }
        children = (field.options || []).map(option => (
          <Checkbox label={option} key={option} value={option} />
        ))
      }
      if (!RenderType) return null
      return React.createElement(
        RenderType,
        {
          ...genericProps,
          ...props,
        },
        children
      )
    })
  }

  render() {
    return (
      <>
        <Modal {...this.modalProps} />
        <div
          style={{ width: '100vw', display: 'flex', justifyContent: 'center' }}
        >
          <div style={{ width: '440px' }}>
            {/* Form Title */}
            {/* -   -   -   -   -   - */}
            <Flex spaceBetween centerItems>
              {this.props.el.formTitle !== undefined && (
                <Text
                  editable
                  content={this.props.el.formTitle}
                  placeholder="Form Title"
                  onChange={e => {
                    this.props.setEl({
                      formTitle: e.target.value,
                    })
                  }}
                  zeroMargin
                  variant="h3"
                  style={{ lineHeight: '2rem' }}
                />
              )}
              <Button link onClick={this.handleOpenEditNameModal}>
                Edit Name
              </Button>
            </Flex>
            {/* Form Fields */}
            {/* -   -   -   -   -   - */}
            <form>{this.renderFields()}</form>
            {/* Add Field Button */}
            {/* -   -   -   -   -   - */}
            {this.renderAddFieldButton(true)}
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
    addFieldModalOpen: PropTypes.bool,
    formFields: PropTypes.array,
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
