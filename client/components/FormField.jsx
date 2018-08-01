import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

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

class FormField extends PureComponent {
  constructor(props) {
    super(props)

    this.FIELDS = FormField.getFields()
  }
  static getFields() {
    return {
      SELECT: 'select',
      TEXTAREA: 'textarea',
      TEXTINPUT: 'textinput',
      RADIO: 'radio',
      CHECKBOX: 'checkbox',
    }
  }

  render() {
    const field = this.props.field
    const T = this.FIELDS

    const genericProps = {
      label: field.label,
      isRequired: field.isRequired,
      onChange: field.onChange,
    }

    const fT = field.inputType
    let RenderType
    let props
    let children
    if (fT === T.SELECT) {
      RenderType = Select
      props = {
        value: field.value,
        defaultValue: (() => {
          // if a value is available ignore placeholder
          // to use placeholder as initial value, do so in the parent of this component
          if (field.value) return
          return field.placeholder
        })(),
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
        value: field.value,
      }
    }
    if (fT === T.TEXTINPUT) {
      RenderType = TextInput
      props = {
        placeholder: field.placeholder,
        value: field.value,
      }
    }
    if (fT === T.RADIO) {
      RenderType = Radios
      props = {
        name: field.formID,
        value: field.value,
        defaultChecked: (() => {
          if (field.value) return
          return field.placeholder
        })(),
      }
      children = (field.options || []).map(option => (
        <RadioOption label={option} key={option} value={option} />
      ))
    }
    if (fT === T.CHECKBOX) {
      RenderType = Checkboxes
      props = {
        values: field.values,
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
  }
}

FormField.propTypes = {}
FormField.defaultProps = {}

export default FormField
