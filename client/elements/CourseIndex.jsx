import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import colors from 'utils/colors'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import * as API from 'api'

import moment from 'moment'
import DatePicker from 'components/DatePicker'
import Modal from 'components/Modal'
import EntityList from 'components/EntityList'
import BasicLayout from 'components/BasicLayout'
import Text, { EdiTitlText } from 'components/Text'
import DropToggle from 'components/DropToggle'
import Button from 'components/Button'
import TextInput from 'components/TextInput'

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
      addCourseRAM: {},
    })

    // use this.COURSE to reference the current course.  Updated during render()
    this.COURSE =
      this.props.courses?.find(c => c.id === this.props.el.selectedCourseId) ||
      {}

    this.handleCourseOnChange = this.handleCourseOnChange.bind(this)
    this.handleCourseTitleChange = this.handleCourseTitleChange.bind(this)
    this.handleDeleteCourse = this.handleDeleteCourse.bind(this)
    this.handleAddNewCourse = this.handleAddNewCourse.bind(this)
  }

  componentDidMount() {
    this.props.getCourses()
    this.props.getRegistrants()
  }

  get filteredRegistrants() {
    if (!this.props.registrants) return []
    const registrants = this.COURSE.registrants
    return this.props.registrants.filter(({ id }) => registrants.includes(id))
  }

  selectCourseById(id, firstInList) {
    let nxtId = id
    if (firstInList) {
      nxtId = this.props.courses[0]?.id
    }
    this.setEl({
      selectedCourseId: nxtId,
    })
  }

  handleAddNewCourse() {
    this.setEl({
      addCourseRAM: {
        id: Date(),
        courseTitle: 'New Course',
        formTemplateId: '',
        courseDate: '',
        location: '',
      },
    })

    const setData = nxt => {
      this.setEl({
        addCourseRAM: {
          ...this.props.el.addCourseRAM,
          ...nxt,
        },
      })
    }

    const modal = {
      open: true,
      header: <>Create Course</>,
      content: (
        <div style={{ margin: '.4rem 0' }}>
          <TextInput
            label="Course Name"
            onChange={e => {
              setData({ courseTitle: e.target.value })
            }}
            value={this.props.el.addCourseRAM.courseTitle}
          />
          <DatePicker
            label="Course Date"
            value={new Date()}
            onChange={date => {
              setData({ courseDate: date })
            }}
          />
          <TextInput
            label="Location"
            onChange={e => {
              setData({ location: e.target.value })
            }}
            value={this.props.el.addCourseRAM.location}
          />
        </div>
      ),
      buttons: (
        <>
          <Button disabled onClick={this.handleAddCourseSave}>
            save
          </Button>
        </>
      ),
      onCancel: () => {
        this.setEl({
          modal: {
            open: false,
          },
        })
      },
    }

    this.setEl({
      modal,
    })
  }

  handleCourseOnChange(selectedCourseId) {
    this.setEl({
      selectedCourseId,
    })
  }

  handleCourseTitleChange(e) {
    const nxtCourse = { ...this.COURSE, courseTitle: e.target.value }
    this.props.dispatch(API.updateCourse({ nxtCourse }))
  }

  handleDeleteCourse(id) {
    const nxtCourses = [...this.props.courses]
    const i = nxtCourses.findIndex(course => course.id === id)
    nxtCourses.splice(i, 1)
    this.props.dispatch(API.deleteCourse({ nxtCourses })).then(() => {
      this.selectCourseById(null, 'first available')
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
            <Text onClick={this.handleAddNewCourse} zeroMargin link>
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
                onClick={() => {
                  this.handleDeleteCourse(course.id)
                }}
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
        onChange={this.handleCourseOnChange}
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
          <Text zeroMargin variant="h5">
            Location: {this.COURSE.location}
          </Text>
        </CourseDetailSection>
        <CourseDetailSection>
          <Text variant="h5" zeroMargin>
            Registrants
          </Text>
        </CourseDetailSection>
        {this.filteredRegistrants.map(person => {
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

  render() {
    return (
      <>
        <Modal {...this.props.el.modal} />
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
    modal: PropTypes.shape({}),
    addCourseRAM: PropTypes.shape({
      courseTitle: PropTypes.string,
      courseDate: PropTypes.string,
      location: PropTypes.string,
    }),
  }),
  registrants: PropTypes.arrayOf(PropTypes.shape({})),
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ),
  getCourses: PropTypes.func.isRequired,
  getRegistrants: PropTypes.func.isRequired,
  dispatch: PropTypes.func,
}
CourseIndex.defaultProps = {}

const mapState = state => ({
  el: state.elCOURSE_INDEX,
  courses: state.courses,
  registrants: state.registrants,
})

const mapDispatch = dispatch => ({
  dispatch,
  setEl: state => {
    dispatch({ type: 'COURSE_INDEX_SET_STATE', state })
  },
  // stop doing this please.. use this.props.dispatch(..your code)
  getCourses: () => dispatch(API.getCourses),
  getRegistrants: () => dispatch(API.getRegistrants),
})

export default connect(
  mapState,
  mapDispatch
)(CourseIndex)
