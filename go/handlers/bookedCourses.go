package handlers

import (
	"github.com/labstack/echo"
	"ThePlatform/go/db"
	"net/http"
	"encoding/json"
)

func (env *ENV) BookCourse(c echo.Context) error {
	uc := &db.BookedCourse{}
	if err := c.Bind(uc); err != nil {
		return err
	}
	// If course is successfully booked into the booked courses table
	if env.Connection.BookCourse(uc) {
		return c.JSON(http.StatusCreated, uc)
	}
	return c.JSON(http.StatusBadRequest, uc)

}

// Get all booked courses
func (env *ENV) GetBookedCourses(c echo.Context) error {
	return c.JSON(http.StatusOK, env.Connection.GetBookedCourses())
}

// Get a specific booked course
func (env *ENV) GetBookedCourse(c echo.Context) error {
	return c.JSON(http.StatusOK, env.Connection.GetBookedCourse(c.Param("bookedCourseID")))
}

// Update a booked course
func (env *ENV) UpdateBookedCourse(c echo.Context) error {
	updateMap := map[string]string{}
	err := json.NewDecoder(c.Request().Body).Decode(&updateMap)
	if err != nil{panic(err)}
	affectedRow, ok := env.Connection.UpdateRow("bookedCourses", "bookedCourseID", c.Param("bookedCourseID"), updateMap)
	if ok {
		return c.JSON(http.StatusOK, affectedRow)
	}
	return c.JSON(http.StatusBadRequest, 0)
}

// Delete a booked course
func (env *ENV) DeleteBookedCourse(c echo.Context) error {
	env.Connection.DeleteRow("bookedCourses", "bookedCourseID", c.Param("bookedCourseID"))
	return c.NoContent(http.StatusOK)
}
