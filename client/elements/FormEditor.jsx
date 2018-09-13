import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import colors from 'utils/colors'
import * as API from 'api'

import Text, { EdiTitlText } from 'components/Text'
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
    const FIELD_TYPES = FormField.getFields()

    // these conditions apply to any input
    if (!meta || !inputType) {
      return false
    }
    if (meta.label === '') {
      return false
    }

    // the following conditions dont apply to text inputs
    if ([FIELD_TYPES.TEXTAREA, FIELD_TYPES.TEXTINPUT].includes(inputType)) {
      return true
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
      selectedFormId: '',
      formTitle: '',
      formFields: [],
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
    this.handleAddNewForm = this.handleAddNewForm.bind(this)
    this.handleFormTitleChange = this.handleFormTitleChange.bind(this)
    this.handleDeleteForm = this.handleDeleteForm.bind(this)
  }

  componentDidMount() {
    // init requests
    this.props.getForms().then(() => {
      this.setEl({
        selectedFormId: this.props.forms[0]?.id,
      })
    })
    this.props.getFormFields()
  }

  get currentFormTitle() {
    return this.props.forms?.find(
      form => form.id === this.props.el.selectedFormId
    )?.formTitle
  }

  get sortedFields() {
    return (
      this.props.formFields
        .filter(field => field.formID === this.props.el.selectedFormId)
        .sort(
          (fieldA, fieldB) =>
            parseInt(fieldA.position) - parseInt(fieldB.position)
        ) || []
    )
  }

  generateNewFormData() {
    // generate a form with a unique title
    const formTitle = (() => {
      const genericName = 'New Form'
      const nameExists = ext => form => form.formTitle === genericName + ext
      // if generic Name isn't taken..
      if (!this.props.forms.find(nameExists(''))) {
        return genericName
      }
      for (let i = 2; true; i++) {
        if (!this.props.forms.find(nameExists(` ${i}`))) {
          return `${genericName} ${i}`
        }
      }
    })()

    return {
      formTitle,
      id: Date(),
    }
  }

  async handleAddNewForm() {
    const newForm = await this.props.createForm({
      newForm: this.generateNewFormData(),
    })
    if (newForm?.id) {
      this.setEl({ selectedFormId: newForm?.id })
    }
  }

  handleDeleteForm(id) {
    const indexOfForm = this.props.forms.findIndex(form => form.id === id)
    const form = this.props.forms[indexOfForm]

    const nxtForms = [...this.props.forms]
    nxtForms.splice(indexOfForm, 1)
    const onDelete = () => {
      let selectedFormId
      // if the form being deleted is active, select the first one
      if (form.id === this.props.el.selectedFormId) {
        selectedFormId = this.props.forms[0]?.id
        // if the first one was selected, select the second
        if (selectedFormId === this.props.el.selectedFormId) {
          selectedFormId = this.props.forms[1]?.id
        }
      }

      // TODO: asdf (dean)
      // with an api the delete would likely return the collection again
      // we fake that with nxtForms
      this.props.deleteForm({ id, nxtForms })

      this.setEl({
        selectedFormId,
      })
      this.props.setModal({
        open: false,
      })
    }

    this.props.setModal({
      open: true,
      header: <>Delete "{form.formTitle}"</>,
      content: <Text>Are you sure?</Text>,
      buttons: (
        <>
          <Button danger onClick={onDelete}>
            delete
          </Button>
        </>
      ),
    })
  }

  handleFormListOnChange(nextFormId) {
    this.setEl({ selectedFormId: nextFormId })
  }

  handleFormTitleChange(e) {
    const nextForms = [...this.props.forms]
    const formRef = nextForms.find(
      form => form.id === this.props.el.selectedFormId
    )
    formRef.formTitle = e.target.value || formRef.formTitle
    this.props.updateForm({ nextForms })
  }

  // this is the callback that receives the FieldSelector node and places it in a modal
  handleInitializeAddFieldSelector(
    FieldSelector,
    index = this.props.formFields.length + 1
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

  handleAddFieldSave(_event, index) {
    const meta = {
      ...this.props.el.newFormFieldMetadata.fieldMetadata,
      formID: this.props.el.selectedFormId,
    }
    const inputType = this.props.el.newFormFieldMetadata.inputType
    if (
      !FormEditor.isFieldMetadataSaveEnabled(this.props.el.newFormFieldMetadata)
    ) {
      // eslint-disable-next-line no-console
      console.error('insufficient data to create form field')
      return
    }

    const nxtField = {
      // the data coming from the FieldSelector (ie meta, and inputType) should have consistent key names
      ...meta,
      inputType,
      position: index,
    }

    this.props.createField({ nxtField })

    this.setEl({
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
    const formField = this.props.formFields.find(field => field.id === id)

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
        {field?.options?.map((fieldOption, index) => {
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
                      const nextOptions = [...field?.options]
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
                        const nextOptions = [...field?.options]
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
    const fieldIndex = this.props.formFields.findIndex(
      field => field.id === metadata.id
    )
    const nextFormFields = [...this.props.formFields]
    nextFormFields.splice(fieldIndex, 1, metadata)

    this.props.updateField({ nextFormFields })
  }

  handleDeleteField(id) {
    const nxtFormFields = (() => {
      const fieldIndex = this.props.formFields.findIndex(
        field => field.id === id
      )
      const nextFormFields = [...this.props.formFields]
      nextFormFields.splice(fieldIndex, 1)
      return nextFormFields
    })()
    this.props.deleteField({ id, nxtFormFields })
    this.props.setModal({ open: false })
  }

  render() {
    return (
      <>
        <Modal {...this.props.el.modal} />
        <BasicLayout
          menuChildren={
            <EntityList
              listTitle={
                <>
                  <Text zeroMargin variant="h3">
                    Forms
                  </Text>
                  <Text onClick={this.handleAddNewForm} zeroMargin link>
                    New Form
                  </Text>
                </>
              }
              listItems={this.props.forms?.map(form => ({
                id: form.id,
                children: (
                  <>
                    <Text vairant="h4">{form.formTitle}</Text>
                    <Text
                      onClick={() => {
                        this.handleDeleteForm(form.id)
                      }}
                      zeroMargin
                      link
                      style={{ color: colors.btnDanger }}
                    >
                      Delete
                    </Text>
                  </>
                ),
              }))}
              selectedId={this.props.el.selectedFormId}
              onChange={this.handleFormListOnChange}
            />
          }
          displayChildren={
            <>
              {/* Form Title */}
              {/* -   -   -   -   -   - */}
              <EdiTitlText
                content={this.currentFormTitle}
                placeholder="Form Title"
                onChange={this.handleFormTitleChange}
              />
              {/* Form Fields */}
              {/* -   -   -   -   -   - */}
              <form>
                {this.sortedFields.map((field, index) => (
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
            </>
          }
        />
      </>
    )
  }
}

FormEditor.propTypes = {
  setEl: PropTypes.func.isRequired,
  forms: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
    })
  ),
  formFields: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
    })
  ),
  el: PropTypes.shape({
    formTitle: PropTypes.string,
    addFieldModalOpen: PropTypes.bool,
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
  getForms: PropTypes.func.isRequired,
  updateForm: PropTypes.func.isRequired,
  createForm: PropTypes.func.isRequired,
  deleteForm: PropTypes.func.isRequired,
  createField: PropTypes.func.isRequired,
  getFormFields: PropTypes.func.isRequired,
  updateField: PropTypes.func.isRequired,
  deleteField: PropTypes.func.isRequired,
}
FormEditor.defaultProps = {}

const mapState = state => ({
  el: state.elFORM_EDITOR,
  forms: state.forms,
  formFields: state.formFields,
})
const mapDispath = dispatch => ({
  setEl: state => {
    return dispatch({ type: 'FORM_EDITOR_SET_STATE', state })
  },
  // this is not relate to this.props.el.modal (this sets the app modal)
  setModal: state => {
    dispatch({ type: 'MODAL_SET_STATE', state })
  },
  getForms: () => dispatch(API.getForms),
  updateForm: meta => dispatch(API.updateForm(meta)),
  createForm: newForm => dispatch(API.createForm(newForm)),
  deleteForm: id => dispatch(API.deleteForm(id)),
  getFormFields: () => dispatch(API.getFormFields),
  createField: meta => dispatch(API.createFormField(meta)),
  updateField: meta => dispatch(API.updateFormField(meta)),
  deleteField: meta => dispatch(API.deleteFormField(meta)),
})

export default connect(
  mapState,
  mapDispath
)(FormEditor)
