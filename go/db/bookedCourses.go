package db

import (
	"time"
	"github.com/satori/go.uuid"
	"strings"
	"fmt"
)

type BookedCourse struct {
	ID 				     int64
	BookedCourseID       string
	DateCreated          string
	StartDate            string    `json:"startDate"`
	EndDate              string    `json:"endDate"`
	DayData              string    `json:"dayData"`
	CourseID 		     string    `json:"courseID"`
	AddressID 		     string    `json:"addressID"`
	InstructorID         string    `json:"instructorID"`
	FormID	 		     string
	CourseFormTableName  string
	RegistrantsTableName string
}

func (db *DB) GetBookedCourses() []BookedCourse {
	query := `SELECT * FROM bookedCourses`
	stmt, err := db.Prepare(query)
	if err != nil {panic(err)}
	rows, err := stmt.Query()
	if err != nil {panic(err)}
	bookedCourses := []BookedCourse{}
	for rows.Next() {
		bookedCourse := BookedCourse{}
		err = rows.Scan(&bookedCourse.ID, &bookedCourse.BookedCourseID, &bookedCourse.DateCreated, &bookedCourse.StartDate, &bookedCourse.EndDate, &bookedCourse.DayData, &bookedCourse.CourseID, &bookedCourse.AddressID, &bookedCourse.InstructorID, &bookedCourse.FormID, &bookedCourse.CourseFormTableName, &bookedCourse.RegistrantsTableName)
		if err != nil {panic(err)}
		bookedCourses = append(bookedCourses, bookedCourse)
	}
	return bookedCourses
}

func (db *DB) GetBookedCourse (id string) BookedCourse {
	query := `SELECT * FROM bookedCourses WHERE bookedCourseID = ?`
	stmt, err := db.Prepare(query)
	if err != nil {panic(err)}
	bookedCourse := BookedCourse{}
	err = stmt.QueryRow(id).Scan(&bookedCourse.ID, &bookedCourse.BookedCourseID, &bookedCourse.DateCreated, &bookedCourse.StartDate, &bookedCourse.EndDate, &bookedCourse.DayData, &bookedCourse.CourseID, &bookedCourse.AddressID, &bookedCourse.InstructorID, &bookedCourse.FormID, &bookedCourse.CourseFormTableName, &bookedCourse.RegistrantsTableName)
	if err != nil {panic(err)}
	return bookedCourse
}

func (db *DB) BookCourse (bookedCourse *BookedCourse) (bool) {
	query := `INSERT INTO bookedCourses (bookedCourseID, dateCreated, startDate, endDate, dayData, courseID, addressID, instructorID, formID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
	stmt, err := db.Prepare(query)
	if err != nil {panic(err)}
	randomID, err := uuid.NewV4()
	if err != nil {panic(err)}
	bookedCourse.BookedCourseID = randomID.String()
	bookedCourse.DateCreated = time.Now().String()[0: 10]
	bookedCourse.FormID = db.GetCourseFormID(bookedCourse.CourseID)
	res, err := stmt.Exec(bookedCourse.BookedCourseID, bookedCourse.DateCreated, bookedCourse.StartDate,
		bookedCourse.EndDate, bookedCourse.DayData, bookedCourse.CourseID, bookedCourse.AddressID, bookedCourse.InstructorID, bookedCourse.FormID)
	if err != nil {panic(err)}
	id, err := res.LastInsertId()
	if err != nil {panic(err)}
	bookedCourse.ID = id
	return true
}

func (db *DB) DeleteBookedCourse (id string) int64 {
	query := `DELETE FROM bookedCourses WHERE bookedCourseID = ?`
	stmt, err := db.Prepare(query)
	if err != nil {panic(err)}
	res, err := stmt.Exec(id)
	if err != nil {panic(err)}
	AR, _ := res.RowsAffected()
	return AR
}

func (db *DB) UpdateRow(tableName, fieldReferance, val string, updateData map[string]string) (int64, bool) {
	updateString := ``
	for fieldName, newVal := range updateData {
		updateString += fieldName + ` = "` + newVal + `", `
	}
	updateString = strings.TrimSuffix(updateString, ", ")
	fmt.Println("*******************************")
	fmt.Println(updateString)
	fmt.Println("*******************************")
	query := `UPDATE `+tableName+` SET ` + updateString + ` WHERE `+ fieldReferance +` = "` + val + `"`
	fmt.Println("*******************************")
	fmt.Println(query)
	fmt.Println("*******************************")
	stmt, err := db.Prepare(query)
	if err != nil {panic(err)}
	res, err := stmt.Exec()
	if err != nil {panic(err)}
	rowAffected, err := res.RowsAffected()
	if err != nil {panic(err)}
	return rowAffected, true
}

// Test JSON for cURL
// "{\"StartDate\": \"2018-06-05\", \"courseID\": \"sjflksjfkj34234\", \"addressID\": \"324j234kf\", \"formIDs\": \"askdfjaklsdjfwe, 2asfjk2\"}"

// {
//"2018-06-05": "6pm-5pm",
//"2018-06-06": "9am-5pm",
//"2018-06-07": "9am-5pm",
//"2018-06-08": "9am-8pm",
//"2018-06-09": "7am-1pm"
//}