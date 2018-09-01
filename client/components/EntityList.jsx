import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import colors from 'utils/colors'

import Text from 'components/Text'

let ListTitle
let ListItem

class EntityList extends PureComponent {
  constructor(props) {
    super(props)
    this.onClickCache = {}
  }

  render() {
    return (
      <>
        {(() => {
          ListTitle =
            ListTitle ||
            styled.div`
              display: flex;
              justify-content: space-between;
              border-bottom: 1px solid #a1a1a1;
              align-items: flex-end;
            `
        })()}
        <ListTitle>{this.props.listTitle}</ListTitle>
        {/* -    -    -    -    -    -   */}
        {/* -    -    -    -    -    -   */}
        {(() => {
          ListItem =
            ListItem ||
            styled(ListTitle)`
              ${props => {
                if (!props.selected) return ''
                const selected = []
                selected.push(`font-size: .7rem;`)
                // battling with specificity
                return `& p { ${selected.join('\n')}} `
              }};
              padding-left: 5px;
            `
        })()}
        {this.props.listItems.map(({ id, children }) => {
          return (
            <ListItem
              selected={id === this.props.selectedId}
              onClick={
                (id && this.onClickCache[id]) ||
                (() => {
                  this.onClickCache[id] = () => {
                    if (this.props.onChange) {
                      this.props.onChange(id)
                    }
                  }
                  return this.onClickCache[id]
                })()
              }
              className="li-hover"
              key={id}
            >
              {children}
            </ListItem>
          )
        })}
      </>
    )
  }
}

EntityList.propTypes = {
  listTitle: PropTypes.node,
  listItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      children: PropTypes.node,
    })
  ),
  selectedId: PropTypes.string,
  onChange: PropTypes.func,
}
EntityList.defaultProps = {
  listItems: [],
}

export default EntityList
