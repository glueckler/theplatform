import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Text from 'components/Text'
import Flex from 'components/Flex'
import Button from 'components/Button'
import AddFormField from 'components/AddFormField'
import FormField from 'components/FormField'
import Modal from 'components/Modal'
import TextInput from 'components/TextInput'

class FormEditor extends Component {
  constructor(props) {
    super(props)

    this.setEl = props.setEl

    this.setEl({
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
      formFieldEdit: {},
    })

    this.handleInitializeAddFieldSelector = this.handleInitializeAddFieldSelector.bind(
      this
    )
    this.handleAddFieldSelectorOnChange = this.handleAddFieldSelectorOnChange.bind(
      this
    )
    this.handleAddFieldSave = this.handleAddFieldSave.bind(this)
    this.handleEditField = this.handleEditField.bind(this)
    this.handleUpdateEditField = this.handleUpdateEditField.bind(this)
    this.handleDeleteField = this.handleDeleteField.bind(this)
  }

  // this is the callback that receives the FieldSelector node and places it in a modal
  handleInitializeAddFieldSelector(FieldSelector) {
    this.props.setModal({
      header: <>Choose Custom Form Field</>,
      open: true,
      content: <FieldSelector onChange={this.handleAddFieldSelectorOnChange} />,
      buttons: (
        <>
          <Button
            disabled={!this.isFieldMetadataSaveEnabled()}
            onClick={this.handleAddFieldSave}
          >
            save
          </Button>
        </>
      ),
    })
  }

  // called any time the state is changed within the FieldSelector component
  handleAddFieldSelectorOnChange(fieldMetadata) {
    this.setEl({
      newFormFieldMetadata: fieldMetadata,
    })

    // this will make sure the button's disabled state is updated if necessary
    this.props.setModal({
      buttons: (
        <>
          <Button
            disabled={!this.isFieldMetadataSaveEnabled(fieldMetadata)}
            onClick={this.handleAddFieldSave}
          >
            save
          </Button>
        </>
      ),
    })
  }

  isFieldMetadataSaveEnabled(metadata) {
    const meta = metadata?.fieldMetadata
    const inputType = metadata?.inputType

    if (!meta || !inputType) {
      return false
    }
    if (meta.label === '') {
      return false
    }
    if (meta.options && meta.options.indexOf('') !== -1) {
      return false
    }
    return true
  }

  handleAddFieldSave() {
    const meta = this.props.el.newFormFieldMetadata.fieldMetadata
    const inputType = this.props.el.newFormFieldMetadata.inputType
    if (!this.isFieldMetadataSaveEnabled(this.props.el.newFormFieldMetadata)) {
      console.error('insufficient data to create form field')
      return
    }
    this.setEl({
      formFields: [
        ...this.props.el.formFields,
        {
          // the data coming from the FieldSelector (ie meta, and inputType) should have consistent key names
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

  // to set up the modal initially, when edit is requested
  handleEditField(id) {
    // pick out the form field..
    const formField = this.props.el.formFields.find(
      field => field.formID === id
    )

    // create the RAM edit object
    this.setEl({
      formFieldEdit: { ...formField },
    })
    this.handleUpdateEditField(formField)
  }

  handleUpdateEditField(field, reset) {
    // if reset flag is passed we are done editing
    if (reset) {
      this.setEl({
        modal: null,
        formFieldEdit: {},
      })
      return
    }

    const content = (
      <>
        <Text variant="h4">Field Label</Text>
        <TextInput
          placeholder="Field Label"
          value={field.label}
          onChange={e => {
            const nextFormFieldEdit = {
              ...this.props.el.formFieldEdit,
              label: e.target.value,
            }
            this.handleUpdateEditField(nextFormFieldEdit)
          }}
        />
        <Text variant="h4">Field Options</Text>
        {field.options.map((fieldOption, index) => {
          return (
            <React.Fragment key={fieldOption}>
              <Text>Field Option {index + 1}</Text>
              <Text
                editable
                placeholder="enter new field"
                content={fieldOption}
                onChange={e => {
                  const nextFormFieldEdit = {
                    ...this.props.el.formFieldEdit,
                    options: (() => {
                      const nextOptions = [
                        ...this.props.el.formFieldEdit.options,
                      ]
                      if (e.target.value === '') {
                        // delete from array if it's empty
                        nextOptions.splice(index, 1)
                      } else {
                        nextOptions.splice(index, 1, e.target.value)
                      }
                      return nextOptions
                    })(),
                  }
                  this.handleUpdateEditField(nextFormFieldEdit)
                }}
              />
              <Text>Add Field Option</Text>
              <Text
                editable
                placeholder="enter new field"
                content={''}
                onChange={e => {
                  const value = e.target.value
                  if (value !== '') {
                    const nextFormFieldEdit = {
                      ...this.props.el.formFieldEdit,
                      options: (() => {
                        const nextOptions = [
                          ...this.props.el.formFieldEdit.options,
                        ]
                        nextOptions.splice(index + 1, 0, e.target.value)
                        return nextOptions
                      })(),
                    }
                    this.handleUpdateEditField(nextFormFieldEdit)
                  }
                }}
              />
            </React.Fragment>
          )
        })}
      </>
    )

    this.setEl({
      modal: {
        content,
        header: <>Edit Field</>,
        open: true,
        buttons: (
          <>
            <Button
              disabled={
                !this.isFieldMetadataSaveEnabled({
                  // this shape is what's expected by isFieldMetadataSaveEnabled..
                  fieldMetadata: field,
                  inputType: field?.inputType,
                })
              }
              onClick={() => {
                this.handleUpdateEditField({}, 'reset :)')
                this.handleSaveEditField(field)
              }}
            >
              save
            </Button>
            <Button
              onClick={() => {
                this.setEl({
                  modal: null,
                  formFieldEdit: {},
                })
              }}
              link
            >
              cancel
            </Button>
          </>
        ),
      },
    })
  }

  handleSaveEditField(metadata) {
    const fieldIndex = this.props.el.formFields.findIndex(
      field => field.formID === metadata.formID
    )
    const nextFormFields = [...this.props.el.formFields]
    nextFormFields.splice(fieldIndex, 1, metadata)

    this.setEl({ formFields: nextFormFields })
  }

  handleDeleteField(id) {
    this.setEl({
      formFields: (() => {
        const fieldIndex = this.props.el.formFields.findIndex(
          field => field.formID === id
        )
        const nextFormFields = [...this.props.el.formFields]
        nextFormFields.splice(fieldIndex, 1)
        return nextFormFields
      })(),
    })
  }

  render() {
    return (
      <>
        <Modal {...this.props.el.modal} />
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
              {(this.props.el.formFields || []).map(field => (
                <div style={{ position: 'relative' }} key={field.formID}>
                  <FormField field={field} />
                  <Flex
                    flexEnd
                    style={{
                      position: 'absolute',
                      top: '0',
                      bottom: '0',
                      left: '0',
                      right: '0',
                    }}
                  >
                    <Button
                      link
                      onClick={() => {
                        this.handleEditField(field.formID)
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => {
                        this.handleDeleteField(field.formID)
                      }}
                      link
                      danger
                    >
                      Delete
                    </Button>
                  </Flex>
                </div>
              ))}
            </form>
            {/* Add Field Button */}
            {/* -   -   -   -   -   - */}
            <AddFormField
              visible
              onReceiveFieldSelector={this.handleInitializeAddFieldSelector}
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
    formFieldEdit: PropTypes.shape({}),
    newFormFieldMetaData: PropTypes.shape({
      fieldMetadata: PropTypes.shape({}),
      inputType: PropTypes.string,
    }),
    modal: PropTypes.shape({}),
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
  // this is not relate to this.props.el.modal (this sets the app modal)
  setModal: state => {
    dispatch({ type: 'MODAL_SET_STATE', state })
  },
})

export default connect(
  mapState,
  mapDispath
)(FormEditor)
