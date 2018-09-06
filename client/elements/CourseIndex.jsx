import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import colors from 'utils/colors'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import * as API from 'api'

import EntityList from 'components/EntityList'
import BasicLayout from 'components/BasicLayout'
import Text, { EdiTitlText } from 'components/Text'
import DropToggle from 'components/DropToggle'

//
//
//
const fakeFormAnswers = [
  {
    field: 'how tall are you?',
    value: 'seven feet',
    id: '123',
  },
  {
    field: 'Do you like toast?',
    value: 'I prefer it in the morning especially on saturdays',
    id: '432',
  },
]

// styled Components
let CourseDetailSection

class CourseIndex extends PureComponent {
  constructor(props) {
    super(props)

    this.setEl = props.setEl
    this.setEl({
      selectedCourseId: '321',
      courses: require('client/examples/fakeCourses'),
    })
    this.COURSE =
      this.props.courses?.find(c => c.id === this.props.el.selectedCourseId) ||
      {}
  }

  componentDidMount() {
    this.props.getCourses()
    this.props.getRegistrants()
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
        listItems={this.props.courses.map(course => ({
          id: course.id,
          children: (
            <>
              <Text vairant="h4">{course.courseTitle}</Text>
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
        selectedId={this.props.el.selectedCourseId}
        onChange={() => {}}
      />
    )
  }

  renderRegistrantContent(id) {
    return fakeFormAnswers.map(field => (
      <div
        key={field.id}
        style={{
          borderBottom: `1px solid ${colors.lightBorder}`,
          padding: '.3rem 0',
        }}
      >
        <Text zeroMargin>{field.field}</Text>
        <Text zeroMargin variant="p3">
          {field.value}
        </Text>
      </div>
    ))
  }

  renderCourse() {
    // update the course value.. keep it freshh
    this.COURSE =
      this.props.courses?.find(c => c.id === this.props.el.selectedCourseId) ||
      {}

    //
    // S t y l e s
    //
    CourseDetailSection =
      CourseDetailSection ||
      styled.div`
        margin-top: 0.8rem;
        border-bottom: 1px solid ${colors.lightBorder};
        display: flex;
        overflow: hidden;
      `

    return (
      <>
        {/* Course Title */}
        {/* -   -   -  - */}
        <EdiTitlText
          content={this.COURSE.courseTitle}
          placeholder="Course Title"
          onChange={this.handleCourseTitleChange}
        />
        <CourseDetailSection>
          <Text
            zeroMargin
            variant="h5"
            style={{ paddingRight: '1em', flex: '0 0 auto' }}
          >
            Course Link:
          </Text>
          {this.COURSE.courseLink && (
            <Link className="text-ellipsis" to={this.COURSE.courseLink}>
              {this.COURSE.courseLink}
            </Link>
          )}
        </CourseDetailSection>
        <CourseDetailSection>
          <Text variant="h5" zeroMargin>
            Registrants
          </Text>
        </CourseDetailSection>
        {this.props.registrants.map(person => {
          return (
            <DropToggle
              key={person.id}
              header={person.name}
              content={this.renderRegistrantContent(person.id)}
            />
          )
        })}
      </>
    )
  }

  renderModal() {}

  render() {
    return (
      <>
        {this.renderModal()}
        <BasicLayout
          menuChildren={this.renderCourseList()}
          displayChildren={this.renderCourse()}
        />
      </>
    )
  }
}

CourseIndex.propTypes = {
  setEl: PropTypes.func,
  el: PropTypes.shape({
    selectedCourseId: PropTypes.string,
  }),
  registrants: PropTypes.arrayOf(PropTypes.shape({})),
  courses: PropTypes.arrayOf(PropTypes.shape({})),
  getCourses: PropTypes.func.isRequired,
  getRegistrants: PropTypes.func.isRequired,
}
CourseIndex.defaultProps = {}

const mapState = state => ({
  el: state.elCOURSE_INDEX,
  courses: state.courses,
  registrants: state.registrants,
})

const mapDispatch = dispatch => ({
  setEl: state => {
    dispatch({ type: 'COURSE_INDEX_SET_STATE', state })
  },
  getCourses: () => dispatch(API.getCourses),
  getRegistrants: () => dispatch(API.getRegistrants),
})

export default connect(
  mapState,
  mapDispatch
)(CourseIndex)
