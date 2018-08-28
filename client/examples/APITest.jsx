import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'
import { getJokes } from 'api/index'

class APITest extends Component {
  constructor(props) {
    super(props)
    this.setEl = props.setEl
  }

  render() {
    console.log(`\n\n\n\nhi\n\n\n\n`)
    return (
      <>
        <button onClick={() => this.props.setEl({ hello: 'hii' })}>
          Change State
        </button>
        <button onClick={this.props.getTemplate}>click to load jokes</button>
        {this.props.jokes &&
          this.props.jokes.map(joke => {
            return <div key={joke.id}>{joke.joke}</div>
          })}
      </>
    )
  }
}

APITest.propTypes = {
  setEl: PropTypes.func.isRequired,
}
APITest.defaultProps = {}

const mapState = state => ({
  jokes: state.template.templateData,
  el: state.elAPITest,
})
const mapDispath = dispatch => ({
  getTemplate: () => {
    getJokes(dispatch)
  },
  setEl: state => {
    dispatch({ type: 'APITEST_SET_STATE', state })
  },
})

export default connect(
  mapState,
  mapDispath
)(APITest)
