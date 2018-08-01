import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { pick, randomHex } from 'yoots'

import Button from 'c/Button'
import FormField from 'c/FormField'
import Text from 'c/Text'

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
// This component is returned when it is requested and will go on to live it's own life somewhere..
//
class FieldSelector extends PureComponent {
  constructor(props) {
    super(props)
    const FIELDS = FormField.getFields()
    this.state = {
      preview: FIELDS.SELECT,
    }
    this.defaultFields = {
      [FIELDS.SELECT]: {
        label: 'select field test',
        inputType: 'select',
        options: ['option1', 'option2', 'option3'],
        placeholder: 'option2',
        formID: 'abc',
      },
      [FIELDS.TEXTINPUT]: {
        label: 'text input field test',
        inputType: 'textinput',
        options: undefined,
        placeholder: 'placeholder test',
        formID: 'abcd',
      },
      [FIELDS.TEXTAREA]: {
        label: 'text area field test',
        inputType: 'textarea',
        options: undefined,
        placeholder: 'placeholder test',
        formID: 'abce',
      },
      [FIELDS.RADIO]: {
        label: 'Radios field test',
        inputType: 'radio',
        options: ['radio option1', 'carls jr', 'carls sr'],
        placeholder: 'carls sr',
        formID: 'abcx',
      },
      [FIELDS.CHECKBOX]: {
        label: 'Checkboxes field test',
        inputType: 'checkbox',
        options: ['Check mate', 'Check Pleaaaase', 'Check yo self'],
        placeholder: 'Check mate',
        formID: 'ax',
      },
    }
  }

  render() {
    //
    // Preview
    //
    // don't regenerate this every state change
    if (!this.cachedPreviewComponent) {
      this.cachedPreviewComponent = ({ fieldName }) => {
        const placeholder = 'Example input';
        return (
          <FormField
            field={{
              inputType: fieldName,
              onChange: () => {
                // nothing needs to happen
              },
              placeholder,
              defaultValue: placeholder,
              options: [placeholder, 'Another Example', 'Etc example'],
              formID: randomHex(),
            }}
          />
        )
      }
    }
    const Preview = this.cachedPreviewComponent

    return (
      <div>
        {Object.keys(this.defaultFields).map(fieldName => (
          <Button
            key={fieldName}
            onMouseOver={e => {
              this.setState({ preview: fieldName })
            }}
          >
            {fieldName}
          </Button>
        ))}
        <div style={{ minHeight: '130px' }}>
          <Text variant="h3">Preview..</Text>
          <Preview fieldName={this.state.preview} />
        </div>
      </div>
    )
  }
}

class AddFormField extends PureComponent {
  constructor(props) {
    super(props)

    const FIELDS = FormField.getFields()

    this.state = {}

    this.handleAddField = this.handleAddField.bind(this)
  }

  createFieldSelector() {
    return <FieldSelector />
  }

  handleAddField() {
    if (this.props.onReceiveFieldSelector) {
      this.props.onReceiveFieldSelector(this.createFieldSelector())
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

AddFormField.propTypes = {}
AddFormField.defaultProps = {}

export default AddFormField
