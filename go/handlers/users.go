package handlers

import (
	"github.com/labstack/echo"
	"ThePlatform/go/db"
	"net/http"
	"encoding/json"
)

func (env *ENV) CreateUser(c echo.Context) error {
	u := &db.User{}
	if err := c.Bind(u); err != nil {
		return err
	}
	if env.Connection.CreateUser(u) {
		return c.JSON(http.StatusCreated, u)
	} else {
		return c.JSON(http.StatusBadRequest, u)
	}
}

func (env *ENV) GetUser(c echo.Context) error {
	return c.JSON(http.StatusOK, env.Connection.GetUser(c.Param("userID")))
}

func (env *ENV) GetUsers(c echo.Context) error {
	return c.JSON(http.StatusOK, env.Connection.GetUsers())
}

func (env *ENV) UpdateUser(c echo.Context) error {
	updateMap := map[string]string{}
	err := json.NewDecoder(c.Request().Body).Decode(&updateMap)
	if err != nil{panic(err)}
	affectedRow, ok := env.Connection.UpdateRow("users", "userID", c.Param("userID"), updateMap)
	if ok {
		return c.JSON(http.StatusOK, affectedRow)
	}
	return c.JSON(http.StatusBadRequest, 0)
}

func (env *ENV) DeleteUser(c echo.Context) error {
	env.Connection.DeleteRow("users", "userID", c.Param("userID"))
	return c.NoContent(http.StatusOK)
}

