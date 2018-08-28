import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import Text from 'components/Text'
import Button from 'components/Button'

let ListTitle
let ListItem

class EntityList extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
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
          ListItem = ListItem || styled(ListTitle)``
        })()}
        {this.props.listItems.map(li => {
          return (
            <ListItem className="link-hover" key={li?.id}>
              <Text vairant="h4">{li?.title}</Text>
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
}
EntityList.defaultProps = {
  listItems: []
}

export default EntityList
