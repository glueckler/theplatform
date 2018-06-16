package db

type Registrants struct {
	UserID 		    string  `json:"userID"`
	BookedCourseID  string 	`json:"bookedCourseID"`
	Price  		    float32	`json:"price"`
	AmtPayed	    float32 `json:"amtPayed"`
	HasPayed   	    bool    `json:"hasPayed"`
	DateRegistered  string  `json:"dateRegistered"`
}

//func (db *DB) SignUpUser()



// What happens When a user signs up?

// 1. Registrant row is created for that user
// 2. FormValues with bookedCourseID & formID are added to formValues table
// 3. Payment form appears, if they pay successfully, registrant row is updated
//

// To retrieve all user form data for a booked course:

// 1. use bookedCourseID to get all userID's from registrants table
// 2. loop through userID's, combine bookedCourseID in a where clause to get all form data for that user
// 3. store in a map and send back to client for display




