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

	// Booked Courses
	e.POST("/bookedCourses", env.BookCourse)
	e.GET("/bookedCourses/:id", env.GetBookedCourse)
	e.GET("/bookedCourses", env.GetBookedCourses)
	//e.PUT("/users", env.updateUser)
	e.DELETE("/bookedCourses/:id", env.DeleteBookedCourse)

	// Courses
	e.POST("/course", env.CreateCourse)
	e.GET("/courses/:id", env.GetCourse)
	e.GET("/courses", env.GetCourses)
	//e.PUT("/users", env.updateUser)
	e.DELETE("/courses/:id", env.DeleteCourse)


	// Start server
	e.Logger.Fatal(e.Start(":1323"))
}
