import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { pick, randomHex } from 'yoots'

import Button from 'components/Button'
import FormField from 'components/FormField'
import Text from 'components/Text'
import TextInput from 'components/TextInput'

const AddFieldBar = styled.div`
  position: relative;
  height: ${props => (props.visible ? '40px' : '10px')};
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

//
// This component is returned when it is requested and will go on to live a life of its own
//
class FieldSelector extends PureComponent {
  constructor(props) {
    super(props)
    this.FIELDS = FormField.getFields()

    // initial metadata
    const placeholder = 'Example input'
    const fieldMetadata = {
      label: 'Example Field Label',
      placeholder,
      defaultValue: placeholder,
      options: [placeholder, 'Another Example', 'Etc example'],
      formID: randomHex(),
    }
    this.state = {
      fieldMetadata,
      inputTypePreview: this.FIELDS.SELECT,
      inputType: null,
    }

    this.handleMetadataTextInput = this.handleMetadataTextInput.bind(this)
    this.handleOnSave = this.handleOnSave.bind(this)
  }

  componentDidMount() {
    // refresh state in the parent component to prevent stale state
    this.handleOnChange()
  }

  componentDidUpdate(_, prevState) {
    // always call props.onChange if the conmponent state changed
    if (this.state !== prevState) {
      this.handleOnChange()
    }
  }

  handleOnChange() {
    // eslint-disable-next-line react/prop-types
    if (this.props.onChange) {
      // just pass the whole state up and cherrry pick in the parent component
      this.props.onChange(this.state)
    }
  }

  handleMetadataTextInput(e) {
    const inputName = e.target.name
    this.setState({
      fieldMetadata: {
        ...this.state.fieldMetadata,
        [inputName]: e.target.value,
        placeholder:
          inputName === 'label'
            ? e.target.value
            : this.state.fieldMetadata.placeholder,
      },
    })
  }

  handleUpdateFieldOption(index, value) {
    this.setState({
      fieldMetadata: {
        ...this.state.fieldMetadata,
        options: this.state.fieldMetadata.options.splice(index, 1, value),
      },
    })
  }

  handleOnSave() {
    return {
      ...this.state.fieldMetadata,
      inputType: this.state.inputType,
    }
  }

  render() {
    return (
      <div>
        <div
          style={{
            maxHeight: '300px',
            overflowY: 'scroll',
            borderBottom: '1px solid #9a9a9a',
            paddingBottom: '22px',
          }}
        >
          {/*   *   *   *   */}
          {/* Field Type Select Buttons */}
          {Object.values(this.FIELDS).map(fieldName => (
            <Button
              key={fieldName}
              primary={this.state.inputType === fieldName}
              onClick={() => {
                this.setState({
                  inputType: fieldName,
                })
              }}
              onMouseOver={e => {
                this.setState({ inputTypePreview: fieldName })
              }}
            >
              {fieldName}
            </Button>
          ))}
          {/*   *   *   *   */}
          {/* Field Name  */}
          <Text variant="h4">Field Options</Text>
          <TextInput
            label="Field Name"
            name="label"
            value={this.state.fieldMetadata.label}
            onChange={this.handleMetadataTextInput}
            placeholder="Field Name"
          />
          {[
            this.FIELDS.SELECT,
            this.FIELDS.RADIO,
            this.FIELDS.CHECKBOX,
          ].includes(this.state.inputType) && (
            <>
              {/*   *   *   *   */}
              {/* Field Options  */}
              {this.state.fieldMetadata.options.map((fieldOption, index) => {
                return (
                  // using the index as a key looks terrible but it's safe since the index is consitent
                  <React.Fragment key={index}>
                    <TextInput
                      label={`Option ${index + 1}`}
                      placeholder={`delete field (empty)`}
                      value={fieldOption}
                      onChange={e => {
                        this.setState({
                          fieldMetadata: {
                            ...this.state.fieldMetadata,
                            options: (() => {
                              const nextOptions = [
                                ...this.state.fieldMetadata.options,
                              ]
                              nextOptions.splice(index, 1, e.target.value)
                              return nextOptions
                            })(),
                          },
                        })
                      }}
                      onBlur={e => {
                        this.setState({
                          fieldMetadata: {
                            ...this.state.fieldMetadata,
                            options: (() => {
                              const nextOptions = [
                                ...this.state.fieldMetadata.options,
                              ]
                              if (e.target.value === '') {
                                // delete from array if it's empty
                                nextOptions.splice(index, 1)
                              }
                              return nextOptions
                            })(),
                          },
                        })
                      }}
                    />
                    <Text
                      editable
                      placeholder="+ Click to Add Option"
                      content={''}
                      onChange={e => {
                        const value = e.target.value
                        if (value !== '') {
                          this.setState({
                            fieldMetadata: {
                              ...this.state.fieldMetadata,
                              options: (() => {
                                const nextOptions = [
                                  ...this.state.fieldMetadata.options,
                                ]
                                nextOptions.splice(index + 1, 0, e.target.value)
                                return nextOptions
                              })(),
                            },
                          })
                        }
                      }}
                    />
                  </React.Fragment>
                )
              })}
            </>
          )}
        </div>
        {/*   *   *   *   */}
        {/* Preview */}
        <Text variant="h3">Preview..</Text>
        <div style={{ minHeight: '90px' }}>
          <FormField
            field={{
              inputType: this.state.inputType || this.state.inputTypePreview,
              ...this.state.fieldMetadata,
            }}
          />
        </div>
      </div>
    )
  }
}

class AddFormField extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {}

    this.handleAddField = this.handleAddField.bind(this)
  }

  handleAddField() {
    if (this.props.onReceiveFieldSelector) {
      this.props.onReceiveFieldSelector(FieldSelector)
    }
  }

  render() {
    return (
      <AddFieldBar
        onClick={this.handleAddField}
        {...pick(this.props, ['visible'])}
      >
        Add Form Field
      </AddFieldBar>
      // <DropDown open={this.state.open}>
      //   This is the dropdown
      // </DropDown>
    )
  }
}

AddFormField.propTypes = {
  onReceiveFieldSelector: PropTypes.func.isRequired,
}
AddFormField.defaultProps = {}

export default AddFormField
