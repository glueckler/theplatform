package db

import "strings"

func (db *DB) InitDB() {
	tables := map[string]map[string]string {
		"registrants" : {
			"userID" 		 : "varchar(255)",
			"bookedCourseID" : "varchar(255)",
			"price"  		 : "float",
			"amtPayed"		 : "float",
			"hasPayed"		 : "bool",
			"dateRegistered" : "date",
		},
		"users" 	: {
			"ID"        : "serial",
			"userID"    : "text",
			"fName"     : "varchar(30)",
			"lName"     : "varchar(30)",
			"email"     : "varchar(30)",
			"locationID" : "text",
			"phone"     : "int",
		},

		"bookedCourses" : {
			"ID"	     	  : "serial",
			"bookedCourseID"  : "text",
			"dateCreated" 	  : "date",
			"startDate" 	  : "date",
			"endDate"		  : "text",
			"dayData"		  : "text",
			"courseID"		  : "text",
			"locationID"	  : "text",
			"instructorID"	  : "text",
			"formID"		  : "text",
		},
		"courses" :  {
			"ID"	         : "serial",
			"courseID"       : "text",
			"courseName"     : "varchar(255)",
			"instructorName" : "varchar(255)",
			"description"    : "text",
			"price"		     : "float",
			"defaultForm"    : "json",
		},
		"forms" : {
			"ID"	           : "serial",
			"formID"           : "text",
			"formName"         : "varchar(50)",
			"dateCreated"      : "timestamp",
			"formGeneratorObj" : "string",
		},
		"formFields" : {
			"ID"          	 : "serial",
			"formFieldID" 	 : "text",
			"bookedCourseID" : "text",
			"field"		  	 : "text",
			"value"		  	 : "text",
 		},
		"locations": {
			"ID"         : "serial",
			"locationID" : "text",
			"addressLn1" : "varchar(40)",
			"addressLn2" : "varchar(40)",
			"postalCode" : "varchar(10)",
			"coords"	 : "varchar(50)",
		},
	}
	db.CreateTables(tables)
}

func (db *DB) CreateTables(tables map[string]map[string]string) {
	for tableName, fields := range tables {
		var values string
		for col, val := range fields {
			values += col + ` ` + val + `, `
		}
		values = strings.TrimSuffix(values, `, `)
		query := `create table `+tableName+` (`+values+`)`
		stmt, err := db.Prepare(query)
		if err != nil {
			panic(err)
		}
		_, err = stmt.Exec()
		if err != nil {
			panic(err)
		}
	}
}
