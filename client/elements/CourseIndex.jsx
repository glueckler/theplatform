import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import colors from 'utils/colors'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import * as API from 'api'
import Y from 'yoots'

import moment from 'moment'
import DatePicker from 'components/DatePicker'
import Modal from 'components/Modal'
import EntityList from 'components/EntityList'
import BasicLayout from 'components/BasicLayout'
import Text, { EdiTitlText } from 'components/Text'
import DropToggle from 'components/DropToggle'
import Button from 'components/Button'
import TextInput from 'components/TextInput'
import Select, { SelectOption } from 'components/Select'

import fakeAnswers123 from 'client/examples/fakeAnswers123'
import fakeAnswers122 from 'client/examples/fakeAnswers122'

// styled Components
let CourseDetailSection

class CourseIndex extends PureComponent {
  constructor(props) {
    super(props)

    this.setEl = props.setEl
    this.setEl({
      selectedCourseId: '',
      courses: require('client/examples/fakeCourses'),
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

  async componentDidMount() {
    await this.props.getForms()
    await this.props.getCourses()
    this.props.getRegistrants()

    // this depends on data from fetching the forms
    this.freshNewCourseRAM()
    // this depends on data from fetching courses
    this.selectCourseById(null, 'first')
  }

  get filteredRegistrants() {
    if (!this.props.registrants) return []
    const registrants = this.COURSE.registrants
    return this.props.registrants.filter(({ id }) => registrants?.includes(id))
  }

  getFormTemplateValueFromId(courseData) {
    return Y.find(Y.propEq('id', courseData.formTemplateId))(this.props.forms)
      ?.formTitle
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

  // set default New Course data here
  freshNewCourseRAM() {
    const addCourseRAM = {
      id: Date(),
      courseTitle: 'New Course',
      formTemplateId: this.props.forms[0]?.formTitle,
      courseDate: [new Date()],
      location: '',
      registrants: [],
      courseLink: `https://theplatform.com/?q=long+url&${Date().replace(
        / /g,
        ''
      )}`,
    }
    this.setEl({
      addCourseRAM,
    })
  }

  generateNewCourseModal(courseData) {
    const validateSave = data => {
      // let's get functional..
      // return true to disable button, if any test fail return true
      const empLocation = Y.propSatisfies(Y.isEmpty(), 'location')
      const empTitle = Y.propSatisfies(Y.isEmpty(), 'courseTitle')

      return Y.anyPass([empTitle, empLocation])(data)
    }

    const onCancel = () => {
      this.setEl({
        modal: {
          open: false,
        },
      })
    }

    const setData = nxt => {
      const addCourseRAM = {
        ...this.props.el.addCourseRAM,
        ...nxt,
      }
      this.setEl({
        addCourseRAM,
        modal: this.generateNewCourseModal(addCourseRAM),
      })
    }

    return {
      open: true,
      header: <>Create Course</>,
      content: (
        <div style={{ margin: '.4rem 0' }}>
          <TextInput
            label="Course Name"
            onChange={e => {
              setData({ courseTitle: e.target.value })
            }}
            value={courseData.courseTitle}
          />
          <DatePicker
            label="Course Date"
            onChange={date => {
              setData({ courseDate: date })
            }}
          />
          <TextInput
            label="Location"
            onChange={e => {
              setData({ location: e.target.value })
            }}
            value={courseData.location}
          />
          <Select
            onChange={e => {
              const value = e.target.value
              const id = Y.find(Y.propEq('formTitle', value))(this.props.forms)
                ?.id
              setData({ formTemplateId: id })
            }}
            value={this.getFormTemplateValueFromId(courseData.id)}
            label="Choose Form Template"
          >
            {this.props.forms.map(form => (
              <SelectOption>{form.formTitle}</SelectOption>
            ))}
          </Select>
        </div>
      ),
      buttons: (
        <>
          <Button
            disabled={validateSave(courseData)}
            onClick={() => {
              this.handleSaveNewCourse(courseData)
            }}
          >
            save
          </Button>
          <Button onClick={onCancel}>cancel</Button>
        </>
      ),
      onCancel,
    }
  }

  handleAddNewCourse() {
    this.freshNewCourseRAM()

    const modal = this.generateNewCourseModal(this.props.el.addCourseRAM)

    this.setEl({
      modal,
    })
  }

  handleSaveNewCourse(courseData) {
    this.props.dispatch(API.addCourse({ courseData }))
    this.setEl({
      modal: { open: false },
    })
    this.freshNewCourseRAM()
  }

  handleCourseOnChange(selectedCourseId) {
    this.setEl({
      selectedCourseId,
    })
  }

  handleCourseTitleChange(e) {
    const nxtCourse = { ...this.COURSE, courseTitle: e.target.value }

    const handleEmpty = () => {
      this.props.setModal({
        open: true,
        header: <>Warning</>,
        content: <Text>Course name can not be empty..</Text>,
      })
    }

    Y.cond([
      [Y.propEq('courseTitle', ''), handleEmpty],
      [
        Y.T,
        () => {
          this.props.dispatch(API.updateCourse({ nxtCourse }))
        },
      ],
    ])(nxtCourse)
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
    const fakeFormAnswers = Y.cond([
      [Y.propEq('formTemplateId', '122'), () => fakeAnswers122],
      [Y.propEq('formTemplateId', '123'), () => fakeAnswers123],
    ])(this.COURSE)
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
            <Link className="text-ellipsis" to="#">
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
          <Text zeroMargin variant="h5">
            Form Template: {this.getFormTemplateValueFromId(this.COURSE)}
          </Text>
        </CourseDetailSection>
        <CourseDetailSection>
          <Text variant="h5" zeroMargin>
            Registrants
          </Text>
        </CourseDetailSection>
        {this.filteredRegistrants.map(person => (
          <DropToggle
            key={person.id}
            header={person.name}
            content={this.renderRegistrantContent(person.id)}
          />
        ))}
        {this.filteredRegistrants.length === 0 && (
          <Text>No one has registered, yet..</Text>
        )}
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
      courseDate: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string])
      ),
      location: PropTypes.string,
    }),
  }),
  setModal: PropTypes.func,
  registrants: PropTypes.arrayOf(PropTypes.shape({})),
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ),
  forms: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      formTitle: PropTypes.string,
    })
  ),
  getForms: PropTypes.func,
  getCourses: PropTypes.func.isRequired,
  getRegistrants: PropTypes.func.isRequired,
  dispatch: PropTypes.func,
}
CourseIndex.defaultProps = {}

const mapState = state => ({
  el: state.elCOURSE_INDEX,
  courses: state.courses,
  registrants: state.registrants,
  forms: state.forms,
})

const mapDispatch = dispatch => ({
  dispatch,
  // this is not relate to this.props.el.modal (this sets the app modal)
  setModal: state => {
    dispatch({ type: 'MODAL_SET_STATE', state })
  },
  setEl: state => {
    dispatch({ type: 'COURSE_INDEX_SET_STATE', state })
  },
  getForms: () => dispatch(API.getForms),
  // stop doing this please.. use this.props.dispatch(..your code)
  getCourses: () => dispatch(API.getCourses),
  getRegistrants: () => dispatch(API.getRegistrants),
})

export default connect(
  mapState,
  mapDispatch
)(CourseIndex)
