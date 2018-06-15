package users

import "The Platform/go/locations"

type User struct {
	fname, lname, email string
	location locations.Location
}

