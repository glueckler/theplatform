package db

var RegistrantsTMD = map[string]string {
	"userID" 		 : "varchar(255)",
	"price"  		 : "float",
	"amtPayed"		 : "float",
	"hasPayed"		 : "bool",
	"dateRegistered" : "date",
}

//func (db *DB) SignUpUser()



// What happends When a user signs up?

// 1. CourseForm row is created for that user
// 2. Registrant row is created for that user
// 3. Payment form appears, if they pay successfully, registrant row is updated
//




