import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ifDiffProps } from 'yoots'

import Text from 'components/Text'
import Flex from 'components/Flex'
import Button from 'components/Button'
import AddFormField from 'components/AddFormField'
import FormField from 'components/FormField'
import Modal from 'components/Modal'
import TextInput from 'components/TextInput'
import BasicLayout from 'components/BasicLayout'
import EntityList from 'components/EntityList'

class FormEditor extends Component {
  static isFieldMetadataSaveEnabled(metadata) {
    const meta = metadata?.fieldMetadata
    const inputType = metadata?.inputType

    if (!meta || !inputType) {
      return false
    }
    if (meta.label === '') {
      return false
    }
    if (meta.options?.indexOf('') !== -1) {
      return false
    }
    return true
  }

  constructor(props) {
    super(props)

    this.setEl = props.setEl

    this.setEl({
      newFormFieldMetadata: {},
      addFieldModalOpen: false,
      selectedFormId: '123',
      formTitle: '',
      forms: [
        {
          formTitle: 'ExampleForm',
          id: '123',
        },
        {
          formTitle: 'Another form',
          id: '122',
        },
      ],
      formFields: [],
      allFields: [
        {
          id: 'ad',
          label: 'select field test',
          inputType: 'select',
          options: ['option1', 'option2', 'option3'],
          placeholder: 'option2',
          formID: '123',
          isRequired: true,
          position: 3,
        },
        {
          id: 'add',
          label: 'text input field test',
          inputType: 'textinput',
          options: undefined,
          placeholder: 'placeholder test',
          formID: '123',
          isRequired: true,
          position: 2,
        },
        {
          id: 'adc',
          label: 'text area field test',
          inputType: 'textarea',
          options: undefined,
          placeholder: 'placeholder test',
          formID: '123',
          isRequired: true,
          position: 1,
        },
        {
          id: 'adb',
          label: 'Radios field test',
          inputType: 'radio',
          options: ['radio option1', 'carls jr', 'carls sr'],
          placeholder: 'carls sr',
          formID: '123',
          isRequired: true,
          position: 4,
        },
        {
          id: 'adn',
          label: 'Checkboxes field test',
          inputType: 'checkbox',
          options: ['Check mate', 'Check Pleaaaase', 'Check yo self'],
          placeholder: 'Check mate',
          formID: '123',
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
    this.handleFormListOnChange = this.handleFormListOnChange.bind(this)
  }

  componentDidUpdate(prevProps) {
    const ifDiff = ifDiffProps(prevProps.el, this.props.el)
    ifDiff('selectedFormId', () => {
      this.freshFormTitle()
      this.freshFormFields()
    })
  }

  freshFormTitle() {
    const formTitle = this.props.el.forms.find(
      form => form.id === this.props.el.selectedFormId
    )?.formTitle
    this.setEl({
      formTitle,
    })
  }

  freshFormFields() {
    let formFields = [...this.props.el.allFields]

    formFields = formFields.filter(
      field => field.formID === this.props.el.selectedFormId
    )
    formFields.sort((a, b) => parseInt(a) - parseInt(b))
    this.setEl({
      formFields,
    })
  }

  handleFormListOnChange(nextFormId) {
    this.setEl({ selectedFormId: nextFormId })
    this.freshFormTitle()
    this.freshFormFields()
  }

  // this is the callback that receives the FieldSelector node and places it in a modal
  handleInitializeAddFieldSelector(
    FieldSelector,
    index = this.props.el.formFields.length + 1
  ) {
    this.props.setModal({
      header: <>Choose Custom Form Field</>,
      open: true,
      content: (
        <FieldSelector
          onChange={fieldMetadata => {
            this.handleAddFieldSelectorOnChange(fieldMetadata, index)
          }}
        />
      ),
      buttons: (
        <>
          <Button
            disabled={!FormEditor.isFieldMetadataSaveEnabled()}
            onClick={e => {
              this.handleAddFieldSave(e, index)
            }}
          >
            save
          </Button>
        </>
      ),
    })
  }

  // called any time the state is changed within the FieldSelector component
  handleAddFieldSelectorOnChange(fieldMetadata, index) {
    this.setEl({
      newFormFieldMetadata: fieldMetadata,
    })

    // this will make sure the button's disabled state is updated if necessary
    this.props.setModal({
      buttons: (
        <>
          <Button
            disabled={!FormEditor.isFieldMetadataSaveEnabled(fieldMetadata)}
            onClick={e => {
              this.handleAddFieldSave(e, index)
            }}
          >
            save
          </Button>
        </>
      ),
    })
  }

  handleAddFieldSave(_, index) {
    // TODO: asdf (dean)
    const meta = this.props.el.newFormFieldMetadata.fieldMetadata
    const inputType = this.props.el.newFormFieldMetadata.inputType
    if (
      !FormEditor.isFieldMetadataSaveEnabled(this.props.el.newFormFieldMetadata)
    ) {
      console.error('insufficient data to create form field')
      return
    }

    // TODO:dean
    // find the field with index and add one to it
    // then update all other fields and add one to their position
    // that's a lot of code...
    // maybe just set it up so el.formFields is guaranteed to be sorted based on position
    // then figure your life out..

    this.setEl({
      formFields: [
        ...this.props.el.formFields,
        {
          // the data coming from the FieldSelector (ie meta, and inputType) should have consistent key names
          ...meta,
          inputType,
          position: index,
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
    const formField = this.props.el.formFields.find(field => field.id === id)

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

    const modalCancel = () => {
      this.setEl({
        modal: null,
        formFieldEdit: {},
      })
    }

    const content = (
      <>
        <TextInput
          label="Field Label"
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
        {field.options?.map((fieldOption, index) => {
          return (
            <React.Fragment key={fieldOption}>
              <Text
                editable
                placeholder="Delete (empty option)"
                content={fieldOption}
                onChange={e => {
                  const nextFormFieldEdit = {
                    ...field,
                    options: (() => {
                      const nextOptions = [...field.options]
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
                underline
              />
              <Text
                editable
                placeholder="+ add option"
                content=""
                onChange={e => {
                  const value = e.target.value
                  if (value !== '') {
                    const nextFormFieldEdit = {
                      ...field,
                      options: (() => {
                        const nextOptions = [...field.options]
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
        onCancel: modalCancel,
        buttons: (
          <>
            <Button
              disabled={
                !FormEditor.isFieldMetadataSaveEnabled({
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
            <Button onClick={modalCancel} link>
              cancel
            </Button>
          </>
        ),
      },
    })
  }

  handleSaveEditField(metadata) {
    const fieldIndex = this.props.el.formFields.findIndex(
      field => field.id === metadata.id
    )
    const nextFormFields = [...this.props.el.formFields]
    nextFormFields.splice(fieldIndex, 1, metadata)

    this.setEl({ formFields: nextFormFields })
  }

  handleDeleteField(id) {
    this.setEl({
      formFields: (() => {
        const fieldIndex = this.props.el.formFields.findIndex(
          field => field.id === id
        )
        const nextFormFields = [...this.props.el.formFields]
        nextFormFields.splice(fieldIndex, 1)
        return nextFormFields
      })(),
    })
    this.props.setModal({ open: false })
  }

  render() {
    return (
      <>
        <Modal {...this.props.el.modal} />
        <BasicLayout
          menuChildren={
            <EntityList
              listTitle={{
                title: 'Forms',
                link: { to: '/courses/new', label: 'New Form' },
              }}
              listItems={this.props.el?.forms?.map(form => ({
                title: form.formTitle,
                id: form.id,
              }))}
              selectedId={this.props.el.selectedFormId}
              onChange={this.handleFormListOnChange}
            />
          }
          displayChildren={
            <div>
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
                    variant="h3"
                    underline
                    fullWidth
                  />
                )}
              </Flex>
              {/* Form Fields */}
              {/* -   -   -   -   -   - */}
              <form>
                {(this.props.el.formFields || []).map((field, index) => (
                  <React.Fragment key={field.id}>
                    <AddFormField
                      onReceiveFieldSelector={
                        this.handleInitializeAddFieldSelector
                      }
                      style={{ marginTop: '15px' }}
                      position={index}
                    >
                      + add
                    </AddFormField>
                    <div style={{ position: 'relative' }}>
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
                            this.handleEditField(field.id)
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => {
                            this.props.setModal({
                              header: <>Delete "{field.label}"</>,
                              open: true,
                              content: <Text>Are you sure?</Text>,
                              buttons: (
                                <>
                                  <Button
                                    danger
                                    onClick={() => {
                                      this.handleDeleteField(field.id)
                                    }}
                                  >
                                    delete
                                  </Button>
                                </>
                              ),
                            })
                          }}
                          link
                          danger
                        >
                          Delete
                        </Button>
                      </Flex>
                    </div>
                  </React.Fragment>
                ))}
              </form>
              {/* Add Field Button */}
              {/* -   -   -   -   -   - */}
              <AddFormField
                visible
                onReceiveFieldSelector={this.handleInitializeAddFieldSelector}
                style={{ marginTop: '20px' }}
              >
                + add form field
              </AddFormField>
            </div>
          }
        />
      </>
    )
  }
}

FormEditor.propTypes = {
  setEl: PropTypes.func.isRequired,
  el: PropTypes.shape({
    formTitle: PropTypes.string,
    addFieldModalOpen: PropTypes.bool,
    forms: PropTypes.arrayOf(PropTypes.shape({})),
    formFields: PropTypes.array,
    formFieldEdit: PropTypes.shape({
      options: PropTypes.array,
    }),
    selectedFormId: PropTypes.string,
    newFormFieldMetadata: PropTypes.shape({
      fieldMetadata: PropTypes.shape({}),
      inputType: PropTypes.string,
    }),
    modal: PropTypes.shape({}),
  }).isRequired,
  setModal: PropTypes.func,
}
FormEditor.defaultProps = {}

const mapState = state => ({
  el: state.elFORM_EDITOR,
})
const mapDispath = dispatch => ({
  setEl: state => {
    return dispatch({ type: 'FORM_EDITOR_SET_STATE', state })
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
