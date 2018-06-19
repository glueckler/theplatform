package handlers

import (
	"github.com/labstack/echo"
	"ThePlatform/go/db"
	"net/http"
	"encoding/json"
)

func (env *ENV) CreateLocation(c echo.Context) error {
	l := &db.Location{}
	if err := c.Bind(l); err != nil {
		return err
	}
	if env.Connection.CreateLocation(l) {
		return c.JSON(http.StatusCreated, l)
	} else {
		return c.JSON(http.StatusBadRequest, l)
	}
}

func (env *ENV) GetLocation(c echo.Context) error {
	return c.JSON(http.StatusOK, env.Connection.GetLocation(c.Param("locationID")))
}

func (env *ENV) GetLocations(c echo.Context) error {
	return c.JSON(http.StatusOK, env.Connection.GetLocations())
}

func (env *ENV) UpdateLocation(c echo.Context) error {
	updateMap := map[string]string{}
	err := json.NewDecoder(c.Request().Body).Decode(&updateMap)
	if err != nil{panic(err)}
	affectedRow, ok := env.Connection.UpdateRow("locations", "locationID", c.Param("locationID"), updateMap)
	if ok {
		return c.JSON(http.StatusOK, affectedRow)
	}
	return c.JSON(http.StatusBadRequest, 0)
}

func (env *ENV) DeleteLocation(c echo.Context) error {
	env.Connection.DeleteRow("locations", "locationID", c.Param("locationID"))
	return c.NoContent(http.StatusOK)
}

