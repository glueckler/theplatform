package handlers

import (
	"github.com/labstack/echo"
	"ThePlatform/go/db"
	"net/http"
)

func (env *ENV) BookCourse(c echo.Context) error {
	uc := &db.BookedCourse{}
	if err := c.Bind(uc); err != nil {
		return err
	}
	// If course is successfully booked into the booked courses table
	if env.Connection.BookCourse(uc) {
		// Get the form id for the booked course
		formID := env.Connection.GetCourseFormID(uc.CourseID)
		// Get the table maker data for the returned form
		tableMakerData := env.Connection.GetTableMakerData(formID)
		// Create a table using the UID of the Booked course with the Table Maker Data of the default form
		// Keep the tableName handy for updated the booked courses entry
		tableName := `courseForm_` + uc.BookedCourseID
		courseFormTableName := env.Connection.CreateTable(tableName, tableMakerData)

		// Create a table for the registrants using the UID of the booked course
		tableName = `registrants_` + uc.BookedCourseID
		registrantsTableName := env.Connection.CreateTable(tableName, db.RegistrantsTMD)

		update := []string{
			"courseFormTableName", courseFormTableName, "registrantsTableName", registrantsTableName,
		}

		// Update booked course with CourseFormTableName and RegistrantsTableName
		_, ok := env.Connection.UpdateBookedCourseM(uc.BookedCourseID, update)
		if ok {
			return c.JSON(http.StatusCreated, uc)
		}
	}
	return c.JSON(http.StatusBadRequest, uc)

}

func (env *ENV) GetBookedCourses(c echo.Context) error {
	return c.JSON(http.StatusOK, env.Connection.GetBookedCourses())
}

func (env *ENV) GetBookedCourse(c echo.Context) error {
	return c.JSON(http.StatusOK, env.Connection.GetBookedCourse(c.Param("id")))
}

func (env *ENV) DeleteBookedCourse(c echo.Context) error {
	env.Connection.DeleteBookedCourse(c.Param("id"))
	return c.NoContent(http.StatusOK)
}
