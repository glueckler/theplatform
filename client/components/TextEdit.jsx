// DELETE MEEEEEE

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Text from 'components/Text'

class TextEdit extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
    this.contentRef = React.createRef()

    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  handleKeyPress() {
    let asdf = this.contentRef.current.target
    debugger
    
  }

  render() {
    return (
      <Text
        onKeyPress={this.handleKeyPress}
        ref={this.contentRef}
        contentEditable
        {...this.props}
      />
    )
  }
}

TextEdit.propTypes = {}
TextEdit.defaultProps = {}

export default TextEdit
