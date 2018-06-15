package handlers

import (
	"github.com/labstack/echo"
	"ThePlatform/go/db"
	"net/http"
	"fmt"
)

func (env *ENV) CreateCourse(c echo.Context) error {
	u := &db.Course{}
	if err := c.Bind(u); err != nil {
		return err
	}
	if env.Connection.CreateCourse(u) {
		return c.JSON(http.StatusCreated, u)
	} else {
		return c.JSON(http.StatusBadRequest, u)
	}
}

func (env *ENV) GetCourse(c echo.Context) error {
	//id, _ := strconv.Atoi(c.Param("id"))
	fmt.Println(c.Param("id"))
	return c.JSON(http.StatusOK, env.Connection.GetCourse(c.Param("id")))
}

func (env *ENV) GetCourses(c echo.Context) error {
	fmt.Println("Get users Reached")
	return c.JSON(http.StatusOK, env.Connection.GetCourses())
}

func (env *ENV) UpdateCourse(c echo.Context) error {
	return c.JSON(http.StatusOK, env.Connection.UpdateUser(c.Param("userID"), c.Param("field"), c.Param("value")))
}

func (env *ENV) DeleteCourse(c echo.Context) error {
	env.Connection.DeleteCourse(c.Param("id"))
	return c.NoContent(http.StatusOK)
}
