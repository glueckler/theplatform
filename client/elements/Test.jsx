import React, { Component } from 'react'
import PropTypes from 'prop-types'

const cherryPick = (source, include) => {
  if (!Array.isArray(include)) {
    console.error(
      `Warning: Attempting to use pro with type ${typeof include}, instead of an Array`
    )
    return null
  }
  return include.reduce((col, key) => {
    return { ...col, [key]: source[key] }
  }, {})
}

class Test extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <>
        <Component1
          {...cherryPick(this.props, [
            'onChange',
            'wait',
            'onNext',
            'onBack',
            'color',
          ])}
        />
      </>
    )
  }
}

Test.propTypes = {}
Test.defaultProps = {}

export default Test
