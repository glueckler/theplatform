import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Text from 'components/Text'
import Flex from 'components/Flex'
import Button from 'components/Button'

class FormEditor extends Component {
  constructor(props) {
    super(props)
    props.setEl({
      formTitle: 'Example Form',
    })
  }

  render() {
    return (
      <div
        style={{ width: '100vw', display: 'flex', justifyContent: 'center' }}
      >
        <div style={{ width: '440px' }}>
          <Flex spaceBetween centerItems>
            <Text zeroMargin variant="h3" style={{ lineHeight: '2rem' }}>
              {this.props.el.formTitle}
            </Text>
            <Button link>Edit</Button>
          </Flex>
        </div>
      </div>
    )
  }
}

FormEditor.propTypes = {
  setEl: PropTypes.func.isRequired,
  el: PropTypes.shape({
    formTitle: PropTypes.string,
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
