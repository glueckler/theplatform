package handlers

import (
	"github.com/labstack/echo"
	"ThePlatform/go/db"
	"net/http"
	"encoding/json"
)

func (env *ENV) CreateFormField(c echo.Context) error {
	f := &db.FormField{}
	if err := c.Bind(f); err != nil {
		return err
	}
	if env.Connection.CreateFormField(f) {
		return c.JSON(http.StatusCreated, f)
	} else {
		return c.JSON(http.StatusBadRequest, f)
	}
}

func (env *ENV) GetFormField(c echo.Context) error {
	return c.JSON(http.StatusOK, env.Connection.GetFormField(c.Param("formFieldID")))
}

func (env *ENV) GetFormFields(c echo.Context) error {
	return c.JSON(http.StatusOK, env.Connection.GetFormFields())
}

func (env *ENV) UpdateFormField(c echo.Context) error {
	updateMap := map[string]string{}
	err := json.NewDecoder(c.Request().Body).Decode(&updateMap)
	if err != nil{panic(err)}
	affectedRow, ok := env.Connection.UpdateRow("formFields", "formFieldID", c.Param("formFieldID"), updateMap)
	if ok {
		return c.JSON(http.StatusOK, affectedRow)
	}
	return c.JSON(http.StatusBadRequest, 0)
}

func (env *ENV) DeleteFormField(c echo.Context) error {
	env.Connection.DeleteRow("formFields", "formFieldID", c.Param("formFieldID"))
	return c.NoContent(http.StatusOK)
}



