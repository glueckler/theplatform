import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import EntityList from 'components/EntityList'
import BasicLayout from 'components/BasicLayout'

class CourseIndex extends PureComponent {
  constructor(props) {
    super(props)

    this.setEl = props.setEl
    this.setEl({
      courseLiItems: [
        { title: 'Bow Making', id: '1' },
        { title: 'Soup Making', id: '2' },
        { title: 'Pie Making', id: '3' },
      ],
    })
  }

  renderCourseList() {
    return (
      <EntityList
        listTitle={{
          title: 'Courses',
          link: { to: '/courses/new', label: 'New Course' },
        }}
        listItems={this.props.el.courseLiItems}
      />
    )
  }

  render() {
    return <BasicLayout menuChildren={this.renderCourseList()} />
  }
}

CourseIndex.propTypes = {
  setEl: PropTypes.func,
  el: PropTypes.shape({
    courseLiItems: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        id: PropTypes.string,
      })
    ),
  }),
}
CourseIndex.defaultProps = {}

const mapState = state => ({
  el: state.elCOURSE_INDEX,
})

const mapDispatch = dispatch => ({
  setEl: state => {
    dispatch({ type: 'COURSE_INDEX_SET_STATE', state })
  },
})

export default connect(
  mapState,
  mapDispatch
)(CourseIndex)
