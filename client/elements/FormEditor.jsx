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

const AddField = styled.div`
  position: relative;
  height: ${props => (props.open ? '40px' : '10px')};
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
class FormEditor extends Component {
  constructor(props) {
    super(props)
    // set to empty obj so lookup values are undefined instead of null
    // will not be necessary once state isn't used after testing purposes
    this.state = {}
    props.setEl({
      addFieldModalOpen: false,
      formTitle: 'Example Form',
    })

    this.setEl = props.setEl

    this.handleOpenAddFieldModal = this.handleOpenAddFieldModal.bind(this)
    this.handleCloseAddFieldModal = this.handleCloseAddFieldModal.bind(this)
  }

  handleOpenAddFieldModal() {
    this.setEl({ addFieldModalOpen: true })
  }

  handleCloseAddFieldModal() {
    this.setEl({ addFieldModalOpen: false })
  }

  handleAddCustomField() {
    return
  }

  renderAddFieldModal() {
    const props = {
      header: <>Create Custom Form Field</>,
      open: this.props.el.addFieldModalOpen,
      onCancel: this.handleCloseAddFieldModal,
      footer: (
        <>
          <Button onClick={this.handleAddCustomField}>add</Button>
          <Button onClick={this.handleCloseAddFieldModal} link>
            cancel
          </Button>
        </>
      ),
    }
    return <Modal {...props} />
  }

  render() {
    return (
      <>
        {this.renderAddFieldModal()}
        <div
          style={{ width: '100vw', display: 'flex', justifyContent: 'center' }}
        >
          <div style={{ width: '440px' }}>
            {/* Form Title */}
            {/* -   -   -   -   -   - */}
            <Flex spaceBetween centerItems>
              <Text zeroMargin variant="h3" style={{ lineHeight: '2rem' }}>
                {this.props.el.formTitle}
              </Text>
              <Button link>Edit Name</Button>
            </Flex>
            {/* Form Fields */}
            {/* -   -   -   -   -   - */}
            <form>
              <Radios
                defaultValue="radio"
                onChange={e => {
                  alert(e.target.value)
                  this.setState({
                    radiosVal: e.target.value,
                  })
                }}
                value={this.state.radiosVal}
                label="these radios"
                id="radios"
              >
                <RadioOption
                  label="this is a label"
                  value="radio2"
                  id="radio2"
                />
                <RadioOption
                  label="this is another label"
                  value="radio"
                  id="radio"
                />
              </Radios>
              <AddField
                onClick={e => {
                  this.handleOpenAddFieldModal()
                }}
              >
                <Text
                  zeroMargin
                  variant="p3"
                  style={{ position: 'absolute', top: '8px' }}
                >
                  Add form field
                </Text>
              </AddField>
              <Checkboxes
                onChange={(e, checked) => {
                  alert(e.target.value)
                  if (!checked) {
                    this.setState({
                      checkVal: (this.state.checkVal || []).concat([
                        e.target.value,
                      ]),
                    })
                  } else {
                    this.setState({
                      checkVal: this.state.checkVal.filter(val => {
                        return val !== e.target.value
                      }),
                    })
                  }
                }}
                values={this.state.checkVal}
                label="checkbox label"
              >
                <Checkbox label="my first checkbox" value="check1" />
                <Checkbox label="my second checkbox" value="check2" />
              </Checkboxes>
              <TextInput
                onChange={e => {
                  this.setState({
                    TIVal: e.target.value,
                  })
                }}
                value={this.state.TIVal}
                placeholder="some placeholder"
                label="Text Input"
                helperText="helper text"
              />
              <TextArea
                onChange={e => {
                  this.setState({
                    TAVal: e.target.value,
                  })
                }}
                value={this.state.TAVal}
                placeholder="some textarea placeholder"
                label="TextArea"
                helperText="ta helper text"
              />
              <Select
                onChange={e => {
                  this.setState({
                    selectVal: e.target.value,
                  })
                }}
                value={this.state.selectVal}
                defaultValue="2"
                label="Select Label"
              >
                <SelectOption value="1">chicken</SelectOption>
                <SelectOption value="2">liver</SelectOption>
                <SelectOption value="3">oil</SelectOption>
              </Select>
              {/* Add Field */}
              {/* -   -   -   -   -   - */}
              <AddField
                open
                onClick={e => {
                  this.handleOpenAddFieldModal()
                }}
              >
                <Text
                  zeroMargin
                  variant="p3"
                  style={{ position: 'absolute', top: '8px' }}
                >
                  Add form field
                </Text>
              </AddField>
            </form>
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
  }).isRequired,
}
FormEditor.defaultProps = {}

const mapState = state => ({
  el: state.elFE,
})
const mapDispath = dispatch => ({
  setEl: state => {
    dispatch({ type: 'FE_SET_STATE', state })
  },
})

export default connect(
  mapState,
  mapDispath
)(FormEditor)
