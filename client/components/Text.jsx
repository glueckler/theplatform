import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Y from 'yoots'
import classNames from 'classnames'
import { diff } from 'deep-diff'

let stripNbsp = str => str.replace(/&nbsp;|\u202F|\u00A0/g, ' ')

class Text extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showPlaceholder: false,
      focusNextCycle: false,
    }

    this.contentRef = React.createRef()

    // set up shouldComponentUpdate only if it's editable..
    if (props.editable) {
      this.shouldComponentUpdate = (nextProps, nextState) => {
        let { props, state, contentRef } = this

        // We need not rerender if the change of props simply reflects the user's edits.
        // Rerendering in this case would make the cursor/caret jump

        if (nextState.showPlaceholder !== state.showPlaceholder) {
          return true
        }

        // Rerender if there is no element yet... (somehow?)
        if (!contentRef.current) {
          return true
        }

        // ...or if html really changed... (programmatically, not by user edit)
        if (
          stripNbsp(nextProps.content) !==
            stripNbsp(contentRef.current.innerText) &&
          nextProps.content !== props.content
        ) {
          return true
        }

        // let optional = ['style', 'className', 'disabled', 'tagName']
        let optional = ['styles', 'className', 'variant']

        // Handle additional properties
        return optional.some(name => !!diff(props[name], nextProps[name]))
      }
    }

    this.handleOnInput = this.handleOnInput.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  componentDidMount() {
    if (this.props.editable) {
      this.contentRef.current.innerText = this.props.content
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const currentRef = this.contentRef.current
    if (this.state.focusNextCycle) {
      currentRef.focus()
      this.setState({
        focusNextCycle: false,
      })
    }

    if (currentRef && currentRef.innerText !== this.props.content) {
      currentRef.innerText = this.props.content
      const range = document.createRange()
      const sel = window.getSelection()
      range.setStart(currentRef, 1)
      range.collapse(true)
      sel.removeAllRanges()
      sel.addRange(range)
    }
  }

  handleKeyDown(e) {
    let blur
    if ([13, 27].includes(e.keyCode)) {
      blur = true
    }
    if (blur && this.contentRef.current) {
      this.contentRef.current.blur()
    }
  }

  handleOnInput(event) {
    if (!this.contentRef.current) return

    let newText = this.contentRef.current.innerText

    // if innerText becomes empty, replace with contentName
    if (newText === '') {
      this.setState({
        showPlaceholder: true,
        focusNextCycle: true,
      })
    } else if (newText !== '' && this.state.showPlaceholder) {
      this.setState({
        showPlaceholder: false,
        focusNextCycle: true,
      })
    }

    if (this.props.onChange && newText !== this.lastText) {
      // "Cannot assign to read only property 'target' of object"
      this.props.onChange({
        ...event,
        target: {
          value: newText,
        },
      })
    }
    this.lastText = newText
  }

  render() {
    let {
      variant,
      zeroMargin,
      editable,
      content,
      className,
      style,
      placeholder,
      ...props
    } = this.props

    let RenderAs = 'p'
    if (Y.startsWith('h', variant)) {
      RenderAs = variant
    }

    // although line height may still mess with alignment
    if (zeroMargin) {
      style = { ...style } || {}
      style.margin = 0
    }

    props = {
      ...props,
      className: classNames(variant, className),
      style: { ...style, minWidth: '20px' },
    }

    if (editable) {
      props.onInput = this.handleOnInput
      props.onKeyDown = this.handleKeyDown
      props.ref = this.contentRef
      props.contentEditable = true
      props.children = null
    }

    const textOut = <RenderAs {...props} />

    if (this.state.showPlaceholder) {
      return (
        <div style={{ position: 'relative', minWidth: '200px' }}>
          {textOut}
          <RenderAs
            style={{
              ...props.style,
              position: 'absolute',
              zIndex: '-1',
              left: '0',
              top: '0',
            }}
            className={props.className}
          >
            {placeholder}
          </RenderAs>
        </div>
      )
    }

    return textOut
  }
}

Text.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.string,
  style: PropTypes.shape({}),
  zeroMargin: PropTypes.bool,
  editable: PropTypes.bool,
}
Text.defaultProps = {
  className: null,
  variant: null,
  style: null,
  zeroMargin: false,
}

export default Text
