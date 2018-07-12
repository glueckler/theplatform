package handlers

import (
"github.com/labstack/echo"
"ThePlatform/go/db"
"net/http"
"fmt"
"encoding/json"
)

func (env *ENV) CreateForm(c echo.Context) error {
	f := &db.Form{}
	if err := c.Bind(f); err != nil {
		return err
	}
	if env.Connection.CreateForm(f) {
		return c.JSON(http.StatusCreated, f)
	} else {
		return c.JSON(http.StatusBadRequest, f)
	}
}

func (env *ENV) GetForm(c echo.Context) error {
	fmt.Println(c.Param("id"))
	return c.JSON(http.StatusOK, env.Connection.GetForm(c.Param("formID")))
}

func (env *ENV) GetForms(c echo.Context) error {
	return c.JSON(http.StatusOK, env.Connection.GetForms())
}

func (env *ENV) UpdateForm(c echo.Context) error {
	updateMap := map[string]string{}
	err := json.NewDecoder(c.Request().Body).Decode(&updateMap)
	if err != nil{panic(err)}
	affectedRow, ok := env.Connection.UpdateRow("forms", "formID", c.Param("formID"), updateMap)
	if ok {
		return c.JSON(http.StatusOK, affectedRow)
	}
	return c.JSON(http.StatusBadRequest, 0)
}

func (env *ENV) DeleteForm(c echo.Context) error {
	env.Connection.DeleteRow("forms", "formID", c.Param("formID"))
	return c.NoContent(http.StatusOK)
}


