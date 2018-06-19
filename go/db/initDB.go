package db

import (
	"strings"
	"sort"
	"fmt"
)

func (db *DB) InitDB() {
	tables := map[string]map[int]string {
		"registrants" : {
			0                : "ID serial",
			1 		         : "userID varchar(255)",
			2 : "bookedCourseID varchar(255)",
			3  		 : "price float",
			4		 : "amtPayed float",
			5		 : "hasPayed bool",
			6 : "dateRegistered date",
		},
		"users" 	: {
			0         : "ID serial",
			1     : "userID text",
			2      : "fName varchar(30)",
			3      : "lName varchar(30)",
			4      : "email varchar(30)",
			5 : "locationID text",
			6      : "phone int",
		},

		"bookedCourses" : {
			0	     	  : "ID serial",
			1  : "bookedCourseID text",
			2 	  : "dateCreated date",
			3 	  : "startDate date",
			4		  : "endDate text",
			5		  : "dayData text",
			6		  : "courseID text",
			7	  : "locationID text",
			8	  : "instructorID text",
			9		  : "formID text",
		},
		"courses" :  {
			0	            : "ID serial",
			1          : "courseID text",
			2        : "courseName varchar(255)",
			3    : "instructorName varchar(255)",
			4       : "description text",
			5		        : "price float",
			6     : "defaultFormID json",
			7 : "defaultLocationID text",
		},
		"forms" : {
			0	           : "ID serial",
			1           : "formID text",
			2         : "formName varchar(50)",
			3 : "formGeneratorObj text",
			4      : "dateCreated timestamp",
		},
		"formFields" : {
			0          	 : "ID serial",
			1 	 : "formFieldID text",
			2 : "bookedCourseID text",
			3		  	 : "field text",
			4		  	 : "value text",
 		},
		"locations": {
			0           : "ID serial",
			1   : "locationID text",
			2 : "locationName varchar(40)",
			3   : "addressLn1 varchar(40)",
			4   : "addressLn2 varchar(40)",
			5         : "city varchar(40)",
			6        : "state varchar(40)",
			7   : "postalCode varchar(10)",
			8	   : "coords varchar(50)",
		},
	}
	db.CreateTables(tables)
}

func (db *DB) CreateTables(tables map[string]map[int]string) {
	for tableName, fields := range tables {
		keys := make([]int, 0)
		for k := range fields {
			keys = append(keys, k)
		}
		sort.Ints(keys)
		var values string
		for _, k := range keys {
			values += fields[k] + `, `
		}
		values = strings.TrimSuffix(values, `, `)
		query := `CREATE TABLE IF NOT EXISTS `+tableName+` (`+values+`)`
		fmt.Println(query)
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


