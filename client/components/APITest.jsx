import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'
import { getJokes } from 'api/index'

class APITest extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <>
        <button onClick={this.props.getTemplate}>click to load jokes</button>
        {this.props.jokes &&
          this.props.jokes.map(joke => {
            return <div key={joke.id}>{joke.joke}</div>
          })}
      </>
    )
  }
}

APITest.propTypes = {}
APITest.defaultProps = {}

const mapState = state => ({
  jokes: state.template.templateData,
})
const mapDispath = dispatch => ({
  getTemplate: () => {
    getJokes(dispatch)
  },
})

export default connect(
  mapState,
  mapDispath
)(APITest)
