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
	connection := db.Connect("root:password@/newdb")
	env := &handlers.ENV{Connection: connection}

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
	e.POST("/course", env.CreateCourse)
	e.GET("/courses/:id", env.GetCourse)
	e.GET("/courses", env.GetCourses)
	e.PUT("/courses/:courseID", env.UpdateCourse)
	e.DELETE("/courses/:id", env.DeleteCourse)

	// Booked Courses
	e.POST("/bookedCourses", env.BookCourse)
	e.GET("/bookedCourses/:id", env.GetBookedCourse)
	e.GET("/bookedCourses", env.GetBookedCourses)
	e.PUT("/bookedCourses/:id", env.UpdateBookedCourse)
	e.DELETE("/bookedCourses/:id", env.DeleteBookedCourse)

	// Registrants
	e.GET("/registrants/:id", env.GetRegistrant)
	e.GET("/registrants", env.GetRegistrants)
	e.PUT("/registrants/:id", env.UpdateRegistrant)
	e.DELETE("/registrants/:id", env.DeleteRegistrant)

	// Start server
	e.Logger.Fatal(e.Start(":1323"))
}
