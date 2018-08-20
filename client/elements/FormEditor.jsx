import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Text from 'components/Text'
import Flex from 'components/Flex'
import Button from 'components/Button'
import AddFormField from 'components/AddFormField'
import FormField from 'components/FormField'

class FormEditor extends Component {
  constructor(props) {
    super(props)
    // set to empty obj so lookup values are undefined instead of null
    // will not be necessary once state isn't used after testing purposes
    this.state = {}
    props.setEl({
      newFormFieldMetadata: {},
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

    // delete i think
    // this.FIELD = {
    //   SELECT: 'select',
    //   TEXTAREA: 'textarea',
    //   TEXTINPUT: 'textinput',
    //   RADIO: 'radio',
    //   CHECKBOX: 'checkbox',
    // }

    this.setEl = props.setEl

    this.handleAddFieldSelector = this.handleAddFieldSelector.bind(this)
    this.handleAddFieldSelectorOnChange = this.handleAddFieldSelectorOnChange.bind(
      this
    )
    this.handleAddFieldSave = this.handleAddFieldSave.bind(this)
  }

  handleAddFieldSelector(FieldSelector) {
    this.props.setModal({
      header: <>Choose Custom Form Field</>,
      open: true,
      content: <FieldSelector onChange={this.handleAddFieldSelectorOnChange} />,
      buttons: (
        <>
          <Button
            disabled={!this.isAddFieldEnabled()}
            onClick={this.handleAddFieldSave}
          >
            save
          </Button>
        </>
      ),
    })
  }

  handleAddFieldSelectorOnChange(fieldMetadata) {
    this.setEl({
      newFormFieldMetadata: fieldMetadata,
    })

    // this will make sure the button disabled state is updated if necessary
    this.props.setModal({
      buttons: (
        <>
          <Button
            disabled={!this.isAddFieldEnabled(fieldMetadata)}
            onClick={this.handleAddFieldSave}
          >
            save
          </Button>
        </>
      ),
    })
  }

  isAddFieldEnabled(metadata) {
    const meta = metadata?.fieldMetadata
    const inputType = metadata?.inputType
    if (!meta || !inputType) {
      return false
    }
    return true
  }

  handleAddFieldSave() {
    const meta = this.props.el.newFormFieldMetadata.fieldMetadata
    const inputType = this.props.el.newFormFieldMetadata.inputType
    if (!this.isAddFieldEnabled(this.props.el.newFormFieldMetadata)) {
      console.error('insufficient data to create form field')
      return
    }
    this.setEl({
      formFields: [
        ...this.props.el.formFields,
        {
          // the data coming from the FieldSelector should have consistent key names
          ...meta,
          inputType,
          position: 4,
        },
      ],
      newFormFieldMetadata: {},
    })

    // and make sure to close the modal
    this.props.setModal({
      open: false,
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
            <form>
              {(this.props.el.formFields || []).map(field => {
                return <FormField key={field.formID} field={field} />
              })}
            </form>
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
