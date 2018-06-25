import React, { Component } from 'react'
import PropTypes from 'prop-types'

class FormBuilder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      creatorFieldSelected: 'default',
      formFields: [
        {
          id: 'asdf',
          fieldType: 'select',
          fieldName: 'Gender',
        },
      ],
    }

    this.formFieldCreatorOnChange = this.formFieldCreatorOnChange.bind(this)
  }

  formFieldCreatorOnChange(e) {
    this.setState({
      creatorFieldSelected: e.target.value,
    })
  }

  renderFormFieldCreatorSelector() {
    const formFields = [
      {
        fieldDisplay: 'Choose..',
        fieldValue: 'default',
      },
      {
        fieldDisplay: 'Radio',
        fieldValue: 'radio',
      },
      {
        fieldDisplay: 'Select',
        fieldValue: 'select',
      },
      {
        fieldDisplay: 'Single Line Text',
        fieldValue: 'textinput',
      },
      {
        fieldDisplay: 'Multi Line Text',
        fieldValue: 'textarea',
      },
    ]

    return (
      <select id="new-input" onChange={this.formFieldCreatorOnChange}>
        {formFields.map(field => {
          return (
            <option
              selected={field.fieldValue === this.state.creatorFieldSelected}
              key={field.fieldValue}
              value={field.fieldValue}
            >
              {field.fieldDisplay}
            </option>
          )
        })}
      </select>
    )
  }

  renderFormFields() {
    const { formFields } = this.state
    if (formFields.length === 0) return null
    return (
      <>
        {formFields.map(field => {
          return <span key={field.id}>{field.fieldName}</span>
        })}
      </>
    )
  }

  render() {
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        {this.renderFormFieldCreatorSelector()}
        {this.renderFormFields()}
      </div>
    )
  }
}

FormBuilder.propTypes = {}
FormBuilder.defaultProps = {}

export default FormBuilder
