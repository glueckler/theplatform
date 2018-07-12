package handlers

import (
	"github.com/labstack/echo"
	"ThePlatform/go/db"
	"net/http"
	"fmt"
	"encoding/json"
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
	return c.JSON(http.StatusOK, env.Connection.GetCourse(c.Param("courseID")))
}

func (env *ENV) GetCourses(c echo.Context) error {
	fmt.Println("Get users Reached")
	return c.JSON(http.StatusOK, env.Connection.GetCourses())
}

func (env *ENV) UpdateCourse(c echo.Context) error {
	updateMap := map[string]string{}
	err := json.NewDecoder(c.Request().Body).Decode(&updateMap)
	if err != nil{panic(err)}
	affectedRow, ok := env.Connection.UpdateRow("courses", "courseID", c.Param("courseID"), updateMap)
	if ok {
		return c.JSON(http.StatusOK, affectedRow)
	}
	return c.JSON(http.StatusBadRequest, 0)
}

func (env *ENV) DeleteCourse(c echo.Context) error {
	env.Connection.DeleteRow("courses", "courseID", c.Param("courseID"))
	return c.NoContent(http.StatusOK)
}
