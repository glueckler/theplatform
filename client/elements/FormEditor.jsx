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
import AddFormField from 'components/AddFormField'
import FormField from 'components/FormField'

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

    this.FIELD = {
      SELECT: 'select',
      TEXTAREA: 'textarea',
      TEXTINPUT: 'textinput',
      RADIO: 'radio',
      CHECKBOX: 'checkbox',
    }

    this.setEl = props.setEl

    this.handleAddFieldSelector = this.handleAddFieldSelector.bind(this)
  }

  handleAddFieldSelector(node) {
    this.props.setModal({
      header: <>Choose Custom Form Field</>,
      open: true,
      content: node,
      buttons: (
        <>
          <Button onClick={this.handle}>save</Button>
        </>
      ),
    })
  }

  renderFields() {
    return (this.props.el.formFields || []).map(field => {
      field.onChange = () => {
        alert('Form Fields are not active during Form Editing')
      }

      return <FormField key={field.formID} field={field} />
    })
  }

  render() {
    return (
      <>
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
            </Flex>
            {/* Form Fields */}
            {/* -   -   -   -   -   - */}
            <form>{this.renderFields()}</form>
            {/* Add Field Button */}
            {/* -   -   -   -   -   - */}
            <AddFormField
              visible
              onReceiveFieldSelector={this.handleAddFieldSelector}
            />
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
  el: state.elFORM_EDITOR,
})
const mapDispath = dispatch => ({
  setEl: state => {
    dispatch({ type: 'FORM_EDITOR_SET_STATE', state })
  },
  setModal: state => {
    dispatch({ type: 'MODAL_SET_STATE', state })
  },
})

export default connect(
  mapState,
  mapDispath
)(FormEditor)
