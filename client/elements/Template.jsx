import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class Template extends Component {
  constructor(props) {
    super(props)
    this.setEl = props.setEl
  }

  render() {
    return (
      <>

      </>
    )
  }
}

Template.propTypes = {
  setEl: PropTypes.func.isRequired,
  el: PropTypes.shape({}).isRequired,
}
Template.defaultProps = {
}

const mapState = state => ({
  el: state.elTemplate,
})
const mapDispath = dispatch => ({
  setEl: state => {
    dispatch({ type: 'TEMPLATE_SET_STATE', state })
  },
})

export default connect(
  mapState,
  mapDispath
)(Template)
