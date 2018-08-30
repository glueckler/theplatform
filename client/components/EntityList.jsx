import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import colors from 'styles/colors'

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
            `
        })()}
        <ListTitle>
          <Text zeroMargin variant="h3">
            {this.props.listTitle?.title}
          </Text>
          <Link
            to={this.props.listTitle?.link?.to}
            style={{ flex: '0 0 auto' }}
          >
            {this.props.listTitle?.link?.label}
          </Link>
        </ListTitle>
        {(() => {
          ListItem =
            ListItem ||
            styled(ListTitle)`
              ${props =>
                props.selected ? `background: ${colors.rowSelected}` : ''};
              padding-left: 5px;
            `
        })()}
        {this.props.listItems.map(({ id, title }) => {
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
              className="link-hover"
              key={id}
            >
              <Text vairant="h4">{title}</Text>
            </ListItem>
          )
        })}
      </>
    )
  }
}

EntityList.propTypes = {
  listTitle: PropTypes.shape({
    title: PropTypes.string,
    link: PropTypes.shape({
      to: PropTypes.string,
      label: PropTypes.string,
    }),
  }),
  listItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
    })
  ),
  selectedId: PropTypes.string,
  onChange: PropTypes.func,
}
EntityList.defaultProps = {
  listItems: [],
}

export default EntityList
