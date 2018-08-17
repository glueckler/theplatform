import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Y from 'yoots'
import classNames from 'classnames'
import { diff } from 'deep-diff'

let stripNbsp = str => str.replace(/&nbsp;|\u202F|\u00A0/g, ' ')

class Text extends Component {
  constructor(props) {
    super(props)

    if (props.editable && !props.content) {
      console.error(
        "WARNING: if content prop isn't supplied to editable Text component it will not function as expected"
      )
    }

    this.state = {
      showPlaceholder: props.content === '',
      localContent: this.props.content,
      initialContent: this.props.content,
      active: false,
    }

    this.allowCaretReset = true
    this.preventFocus = false

    this.contentRef = React.createRef()

    // set up shouldComponentUpdate only if it's editable..
    if (props.editable) {
      this.shouldComponentUpdate = (nextProps, nextState) => {
        let { props, state, contentRef } = this

        // Rerender if there is no element yet... (somehow?)
        if (!contentRef.current) {
          return true
        }

        // check if the placeholder state has changed
        if (this.state.showPlaceholder !== nextState.showPlaceholder) {
          return true
        }

        if (this.state.active !== nextState.active) {
          return true
        }

        // or if content really changed (programmatically, not by user edit)
        if (
          stripNbsp(nextProps.content) !==
            stripNbsp(this.state.initialContent) &&
          nextProps.content !== this.state.initialContent
        ) {
          return true
        }

        let optional = ['styles', 'className', 'variant']

        // Handle additional properties
        return optional.some(name => !!diff(props[name], nextProps[name]))
      }
    }

    this.handleOnInput = this.handleOnInput.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  componentDidMount() {
    if (!this.props.editable) return
    // since the children property will not be used for with editable flag
    this.contentRef.current.innerText = this.props.content
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // code below is not very relavent if not editable
    if (!this.props.editable) return

    const currentRef = this.contentRef.current

    // if the content prop changes for some reason, all hell breaks loose
    if (this.props.content !== this.state.initialContent) {
      this.setState({
        initialContent: this.props.content,
        localContent: this.props.content,
      })
    }

    // check if placeholer is necessary in new state
    // checking placeholder against current innerText is not reliable so use localContent
    if (this.handlePlaceholder(this.state.localContent)) {
      // also if handlePlaceholder triggers another cycle we will bail on the rest of this function
      // and not fuck up this focus flags
      return
    }

    if (currentRef?.innerText !== this.state.localContent) {
      currentRef.innerText = this.state.localContent
      // cause this will cause automatic focus which is not alwaayss cool
      if (this.state.active) {
        const range = document.createRange()
        range.setStart(currentRef, 1)
        range.collapse(true)
        // removes highlights
        const sel = window.getSelection()
        sel.removeAllRanges()
        sel.addRange(range)
      } else {
        this.allowCaretReset = true
      }
    }

    if (this.state.active) {
      if (currentRef) currentRef.focus()
    } else {
      if (currentRef) currentRef.blur()
    }
  }

  handleKeyDown(e) {
    if (e.key === 'Escape') {
      this.handleEscapeComponent()
    }

    if (e.key === 'Enter') {
      // "Cannot assign to read only property 'target' of object"
      this.props.onChange({
        ...event,
        target: {
          value: this.contentRef.current.innerText,
        },
      })
      this.setState({
        active: false,
      })
      e.preventDefault()
    }
  }

  handleOnInput(event) {
    if (!this.contentRef.current) return

    let newText = this.contentRef.current.innerText

    this.handlePlaceholder(newText)

    this.setState({
      localContent: newText,
    })
  }

  handlePlaceholder(innerText) {
    // if innerText becomes empty, replace with placeholder
    if (innerText === '' && !this.state.showPlaceholder) {
      this.setState({
        showPlaceholder: true,
      })
      return true
    }

    if (innerText !== '' && this.state.showPlaceholder) {
      this.setState({
        showPlaceholder: false,
      })
      return true
    }
  }

  handleEscapeComponent() {
    // reset component as if it was not touched and do not call onChange
    this.setState({
      localContent: this.state.initialContent,
      active: false,
    })
    // just to really blur it
    this.contentRef.current.blur()

    // set the inner HTML or the range method inside componentDidUpdate will error
    this.contentRef.current.innerText = this.state.initialContent

    // removes highlights
    const sel = window.getSelection()
    sel.removeAllRanges()
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
    if (Y.isString(variant) && Y.startsWith('h', variant)) {
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
      props.onBlur = e => {
        this.setState({
          active: false,
        })
        if (this.props.onBlur) {
          this.props.onBlur()
        }
      }
      props.onFocus = e => {
        this.setState({
          active: true,
        })
        if (this.props.onFocus) {
          this.props.onFocus()
        }
      }
      props.onClick = e => {
        this.setState({
          active: true,
        })
        if (this.props.onClick) {
          this.props.onClick()
        }
      }
      props.ref = this.contentRef
      props.contentEditable = true
      props.children = null
    }

    const textOut = <RenderAs {...props} />

    if (this.state.showPlaceholder) {
      return (
        <div
          style={{ position: 'relative', minWidth: '200px', overflow: 'auto' }}
        >
          {textOut}
          <RenderAs
            style={{
              ...props.style,
              position: 'absolute',
              left: '0',
              top: '0',
            }}
            onClick={() => {
              this.setState({
                active: true,
              })
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
  onChange: PropTypes.func,
}
Text.defaultProps = {
  className: null,
  variant: null,
  style: null,
  zeroMargin: false,
  content: '',
}

export default Text
