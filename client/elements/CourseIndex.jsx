import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import colors from 'styles/colors'

import EntityList from 'components/EntityList'
import BasicLayout from 'components/BasicLayout'
import Text from 'components/Text'

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
        listTitle={
          <>
            <Text zeroMargin variant="h3">
              Courses
            </Text>
            <Text onClick={this.handleAddNewForm} zeroMargin link>
              New Course
            </Text>
          </>
        }
        listItems={this.props.el?.courseLiItems?.map(course => ({
          id: course.id,
          children: (
            <>
              <Text vairant="h4">TITKE</Text>
              <Text
                onClick={() => {}}
                zeroMargin
                link
                style={{ color: colors.btnDanger }}
              >
                Delete
              </Text>
            </>
          ),
        }))}
        selectedId={this.props.el.selectedFormId}
        onChange={this.handleFormListOnChange}
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
