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
		return c.JSON(http.StatusCreated, uc)
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
