package main

import (
	"ThePlatform/go/db"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"ThePlatform/go/handlers"
)



//----------
// Handlers
// ---------





func main() {
	connection := db.Connect("root:password@/ThePlatform")
	env := &handlers.ENV{Connection: connection}

	env.Connection.InitDB()

	e := echo.New()

	// Middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	// Users
	e.POST("/users", env.CreateUser)
	e.GET("/users/:userID", env.GetUser)
	e.GET("/users", env.GetUsers)
	e.PUT("/users/:userID", env.UpdateUser)
	e.DELETE("/users/:userID", env.DeleteUser)

	// Courses
	e.POST("/courses", env.CreateCourse)
	e.GET("/courses/:courseID", env.GetCourse)
	e.GET("/courses", env.GetCourses)
	e.PUT("/courses/:courseID", env.UpdateCourse)
	e.DELETE("/courses/:courseID", env.DeleteCourse)

	// Booked Courses
	e.POST("/bookedCourses", env.BookCourse)
	e.GET("/bookedCourses/:bookedCourseID", env.GetBookedCourse)
	e.GET("/bookedCourses", env.GetBookedCourses)
	e.PUT("/bookedCourses/:bookedCourseID", env.UpdateBookedCourse)
	e.DELETE("/bookedCourses/:bookedCourseID", env.DeleteBookedCourse)

	// Registrants
	e.GET("/registrants/:registrantID", env.GetRegistrant)
	e.GET("/registrants", env.GetRegistrants)
	e.PUT("/registrants/:registrantID", env.UpdateRegistrant)
	e.DELETE("/registrants/:registrantID", env.DeleteRegistrant)

	// Forms
	e.POST("/forms", env.CreateForm)
	e.GET("/forms/:formID", env.GetForm)
	e.GET("/forms", env.GetForms)
	e.PUT("/forms/:formID", env.UpdateForm)
	e.DELETE("/forms/:formID", env.DeleteForm)

	// FormFields
	e.POST("/formFields", env.CreateFormField)
	e.GET("/formFields/:formFieldID", env.GetFormField)
	e.PUT("/formFields/:formFieldID", env.UpdateFormField)
	e.DELETE("/formFields/:formFieldID", env.DeleteFormField)

	// Forms
	e.POST("/locations", env.CreateLocation)
	e.GET("/locations/:locationID", env.GetLocation)
	e.GET("/locations", env.GetLocations)
	e.PUT("/locations/:locationID", env.UpdateLocation)
	e.DELETE("/locations/:locationID", env.DeleteLocation)

	// Start server
	e.Logger.Fatal(e.Start(":1323"))
}
