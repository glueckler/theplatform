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

// cache for styled components
const S = {}

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

    // fieldMetadata options onChange
    this.optionsOnChange = index => e => {
      this.setState({
        fieldMetadata: {
          ...this.state.fieldMetadata,
          options: (() => {
            const options = this.state.fieldMetadata.options
            options.splice(index, 1, e.target.value)
            return [...options]
          })(),
        },
      })
    }
    this.optionsOnChangeCache = []

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
        <Text variant="h4">Field Name</Text>
        <TextInput
          name="label"
          value={this.state.fieldMetadata.label}
          onChange={this.handleMetadataTextInput}
          placeholder="Field Name"
        />
        {[this.FIELDS.SELECT, this.FIELDS.RADIO, this.FIELDS.CHECKBOX].includes(
          this.state.inputType
        ) && (
          <>
            {/*   *   *   *   */}
            {/* Field Options  */}
            <Text variant="h4">Field Options</Text>
            {this.state.fieldMetadata.options.map((fieldOption, index) => {
              const onChange = (() => {
                if (!this.optionsOnChangeCache[index]) {
                  this.optionsOnChangeCache[index] = this.optionsOnChange(index)
                }
                return this.optionsOnChangeCache[index]
              })()

              return (
                <Text
                  key={fieldOption}
                  editable
                  placeholder="enter new field"
                  content={fieldOption}
                  onChange={onChange}
                />
              )
            })}
          </>
        )}
        {/*   *   *   *   */}
        {/* Preview */}
        {(() => {
          if (!S.Preview) {
            S.Preview = styled.div`
              margin-top: 50px;
              border-top: 1px solid #afafaf;
            `
          }
          return (
            <S.Preview>
              <Text variant="h3">Preview..</Text>
              <div style={{ minHeight: '90px' }}>
                <FormField
                  field={{
                    inputType:
                      this.state.inputType || this.state.inputTypePreview,
                    ...this.state.fieldMetadata,
                  }}
                />
              </div>
            </S.Preview>
          )
        })()}
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
