package db

//import "encoding/json"

type FormFields struct {
	ID              int64
	formFieldID 	string
	bookedCourseID  string
	field		  	string
	value		  	string
}

func (db *DB) GetUserFormDataForBookedCourse(bcID, userID string) []map[string]interface{} {
	query := `SELECT * FROM formValues WHERE userID = ? && bookedCourseID = ?`
	stmt, err := db.Prepare(query)
	if err != nil{panic(err)}
	data := []map[string]interface{}{}
	rows, err := stmt.Query(bcID, userID)
	if err != nil{panic(err)}
	for rows.Next() {
		ff := &FormFields{}
		rows.Scan(ff)
		data = append(data, map[string]interface{}{
			"id": ff.ID,
			"type": "formField",
			"attributes": ff,
		})
	}
	return data
}
