package db

import "github.com/satori/go.uuid"

type FormField struct {
	ID              int64
	FormFieldID 	string `json:"formFieldID"`
	BookedCourseID  string `json:"bookedCourseID"`
	Field		  	string `json:"field"`
	Value		  	string `json:"value"`
}

func (db *DB) CreateFormField (formField *FormField) (bool) {
	query := `INSERT INTO formFields (formFieldID, bookedCourseID, field, value) VALUES (?, ?, ?, ?)`
	stmt, err := db.Prepare(query)
	if err != nil {panic(err)}
	randomID, err := uuid.NewV4()
	if err != nil {panic(err)}
	formField.FormFieldID = randomID.String()
	res, err := stmt.Exec(formField.FormFieldID, formField.BookedCourseID, formField.Field, formField.Value)
	if err != nil {panic(err)}
	id, err := res.LastInsertId()
	if err != nil {panic(err)}
	formField.ID = id
	return true
}

func (db *DB) GetFormField (id string) FormField {
	query := `SELECT * FROM formFields WHERE formFieldID = ?`
	stmt, err := db.Prepare(query)
	if err != nil {panic(err)}
	formField := FormField{}
	err = stmt.QueryRow(id).Scan(&formField.ID, &formField.FormFieldID, &formField.BookedCourseID, &formField.Field, &formField.Value)
	if err != nil {panic(err)}
	return formField
}

func (db *DB) GetFormFields() []FormField {
	query := `SELECT * FROM formFields`
	stmt, err := db.Prepare(query)
	if err != nil {panic(err)}
	rows, err := stmt.Query()
	if err != nil {panic(err)}
	formFields := []FormField{}
	for rows.Next() {
		formField := FormField{}
		err = rows.Scan(&formField.ID, &formField.FormFieldID, &formField.BookedCourseID, &formField.Field, &formField.Value)
		if err != nil {panic(err)}
		formFields = append(formFields, formField)
	}
	return formFields
}


func (db *DB) GetUserFormDataForBookedCourse(bcID, userID string) []map[string]interface{} {
	query := `SELECT * FROM formValues WHERE userID = ? && bookedCourseID = ?`
	stmt, err := db.Prepare(query)
	if err != nil{panic(err)}
	data := []map[string]interface{}{}
	rows, err := stmt.Query(bcID, userID)
	if err != nil{panic(err)}
	for rows.Next() {
		ff := &FormField{}
		rows.Scan(ff)
		data = append(data, map[string]interface{}{
			"id": ff.ID,
			"type": "formField",
			"attributes": ff,
		})
	}
	return data
}
