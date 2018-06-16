package handlers

import (
	"github.com/labstack/echo"
	"net/http"
	"encoding/json"
)

// Get all registrants
func (env *ENV) GetRegistrants(c echo.Context) error {
	return c.JSON(http.StatusOK, env.Connection.GetRegistrants())
}

// Get a specific registrant
func (env *ENV) GetRegistrant(c echo.Context) error {
	return c.JSON(http.StatusOK, env.Connection.GetRegistrant(c.Param("id")))
}

// Update a registrant
func (env *ENV) UpdateRegistrant(c echo.Context) error {
	updateMap := map[string]string{}
	err := json.NewDecoder(c.Request().Body).Decode(&updateMap)
	if err != nil{panic(err)}
	affectedRow, ok := env.Connection.UpdateRow("registrants", "registrantID", c.Param("id"), updateMap)
	if ok {
		return c.JSON(http.StatusOK, affectedRow)
	}
	return c.JSON(http.StatusBadRequest, 0)
}

// Delete a registrant
func (env *ENV) DeleteRegistrant(c echo.Context) error {
	env.Connection.DeleteRow("registrants", "registrantID", c.Param("id"))
	return c.NoContent(http.StatusOK)
}
