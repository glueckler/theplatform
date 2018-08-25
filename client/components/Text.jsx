import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import Y from 'yoots'
import { diff } from 'deep-diff'

const stripNbsp = str => str.replace(/&nbsp;|\u202F|\u00A0/g, ' ')

// styled component cache
// inputs is what we'll call the type of text element rendered ie h2, p, h3 etc
// it's unlikely anything else will be styled here, but other styled inputs would live in the outer obj
const S = { inputs: {} }

class Text extends Component {
  constructor(props) {
    super(props)

    if (props.editable && !props.content && props.content !== '') {
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
        const { props, contentRef } = this

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

        const optional = ['styles', 'className', 'variant']

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
      // eslint-disable-next-line react/no-did-update-set-state
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
        // and reset the initial content to it's new life
        initialContent: this.contentRef.current.innerText,
      })
      e.preventDefault()
    }
  }

  handleOnInput(event) {
    if (!this.contentRef.current) return

    const newText = this.contentRef.current.innerText

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
      placeholder,
      style,
      fullWidth,
      underline,
      ...innerElementProps
    } = this.props

    const outerElementProps = { ...innerElementProps }

    let RenderAs = 'p'
    if (Y.isString(variant) && Y.startsWith('h', variant)) {
      RenderAs = variant
    }

    // create cached styled component based on RenderAs
    if (!S.inputs[RenderAs]) {
      S.inputs[RenderAs] = styled[RenderAs]`
        ${zeroMargin ? 'margin: 0' : ''};
        width: 100%;
        &:focus {
          outline: none;
        }
      `
    }

    RenderAs = S.inputs[RenderAs]

    innerElementProps = {
      ...innerElementProps,
      className: variant,
    }

    if (editable) {
      innerElementProps.onInput = this.handleOnInput
      innerElementProps.onKeyDown = this.handleKeyDown
      innerElementProps.onBlur = e => {
        this.setState({
          active: false,
        })
        if (this.props.onBlur) {
          this.props.onBlur()
        }
      }
      innerElementProps.onFocus = e => {
        this.setState({
          active: true,
        })
        if (this.props.onFocus) {
          this.props.onFocus()
        }
      }
      innerElementProps.onClick = e => {
        this.setState({
          active: true,
        })
        if (this.props.onClick) {
          this.props.onClick()
        }
      }
      innerElementProps.innerRef = this.contentRef
      innerElementProps.contentEditable = true
      innerElementProps.children = null
    }

    const textOut = <RenderAs {...innerElementProps} />

    // if it's not editable just send it
    if (!editable) return textOut

    // this return is only relevant if it's contenteditable
    return (
      <div
        style={{
          position: 'relative',
          width: `${fullWidth ? '100%' : '160px'}`,
          overflow: 'hidden',
          cursor: 'text',
          ...style,
        }}
        {...outerElementProps}
      >
        {textOut}
        {this.state.showPlaceholder && (
          <RenderAs
            style={{
              position: 'absolute',
              left: '0',
              bottom: '0',
            }}
            onClick={() => {
              this.setState({
                active: true,
              })
            }}
            className={innerElementProps.className}
          >
            {placeholder}
          </RenderAs>
        )}
        {/* underline div */}
        {/* this isn't that clean but I couldn't get it working without a whole other div section */}
        <div
          style={{
            position: 'absolute',
            left: '0',
            bottom: '0',
            height: '2px',
            width: '100%',
          }}
        >
          {this.props.underline && (
            <div
              style={{
                position: 'absolute',
                top: '0',
                width: '100%',
                height: '1px',
                backgroundColor: '#9a9a9a',
                transition: 'all .2s ease',
              }}
            />
          )}
          <div
            style={{
              position: 'absolute',
              top: '0',
              height: '2px',
              backgroundColor: '#0094d2',
              transition: 'all .2s ease',
              width: `${this.state.active ? '100%' : '0'}`,
            }}
          />
        </div>
      </div>
    )
  }
}

Text.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.string,
  style: PropTypes.shape({}),
  zeroMargin: PropTypes.bool,
  editable: PropTypes.bool,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  fullWidth: PropTypes.bool,
  underline: PropTypes.bool,
  content: PropTypes.string,
}
Text.defaultProps = {
  className: null,
  variant: null,
  style: null,
  zeroMargin: false,
}

export default Text
