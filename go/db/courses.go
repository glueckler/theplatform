package db

import (
	"github.com/satori/go.uuid"
	//"fmt"
)

type Course struct {
	ID                int64
	CourseID          string   `json:"CourseID"`
	CourseName        string   `json:"CourseName"`
	InstructorName    string   `json:"instructorName"`
	Description       string   `json:"description"`
	Price             float32  `json:"price"`
	DefaultFormID     string   `json:"defaultFormID"`
	DefaultLocationID string   `json:"defaultFormID"`
}

func (db *DB) CreateCourse (course *Course) (bool) {
	query := `INSERT INTO courses (instructorName, description, price, defaultFormID, courseID, courseName, defaultLocationID) VALUES (?, ?, ?, ?, ?, ?, ?)`
	stmt, err := db.Prepare(query)
	if err != nil {panic(err)}
	randomID, err := uuid.NewV4()
	if err != nil {panic(err)}
	course.CourseID = randomID.String()
	res, err := stmt.Exec(course.InstructorName, course.Description, course.Price, course.DefaultFormID, course.CourseID, course.CourseName, course.DefaultLocationID)
	if err != nil {panic(err)}
	id, err := res.LastInsertId()
	if err != nil {panic(err)}
	course.ID = id
	return true
}

func (db *DB) GetCourse (id string) Course {
	query := `SELECT * FROM courses WHERE courseID = ?`
	stmt, err := db.Prepare(query)
	if err != nil {panic(err)}
	course := Course{}
	err = stmt.QueryRow(id).Scan(&course.ID, &course.CourseID, &course.CourseName, &course.InstructorName, &course.Description, &course.Price, &course.DefaultFormID, &course.DefaultLocationID)
	if err != nil {panic(err)}
	return course
}

// Test cURL for creating course "{\"instructorName\": \"Skeet\", \"description\": \"Some great course where you learn lots about the great outdoors!\", \"price\": \"300.34\", \"defaultFormID\": \"3, 4\", \"courseID\": \"SomeCourseID\", \"courseName\": \"proper Butt cleaning\"}"

func (db *DB) GetCourses() []Course {
	query := `SELECT * FROM courses`
	stmt, err := db.Prepare(query)
	if err != nil {panic(err)}
	rows, err := stmt.Query()
	if err != nil {panic(err)}
	courses := []Course{}
	for rows.Next() {
		course := Course{}
		err = rows.Scan(&course.ID, &course.CourseID, &course.CourseName, &course.InstructorName, &course.Description, &course.Price, &course.DefaultFormID, &course.DefaultLocationID)
		if err != nil {panic(err)}
		courses = append(courses, course)
	}
	return courses
}

func (db *DB) GetCourseFormID(courseID string) string {
	query := `SELECT defaultFormID FROM courses where courseID = ?`
	stmt, err := db.Prepare(query)
	if err != nil {panic(err)}
	var formID string
	stmt.QueryRow(courseID).Scan(&formID)
	return formID
}