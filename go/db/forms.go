package db

import (
	"github.com/satori/go.uuid"
)

type Form struct {
	ID				    int64
	FormID  		    string
	FormName            string `json:"formName"`
	FormGeneratorObject string `json:"formGeneratorObject"`
	DateCreated			string
}

func (db *DB) CreateForm (form *Form) (bool) {
	query := `INSERT INTO forms (formID, formName, formGeneratorObj) VALUES (?, ?, ?)`
	stmt, err := db.Prepare(query)
	if err != nil {panic(err)}
	randomID, err := uuid.NewV4()
	if err != nil {panic(err)}
	form.FormID = randomID.String()
	res, err := stmt.Exec(&form.FormID, &form.FormName, &form.FormGeneratorObject)
	if err != nil {panic(err)}
	id, err := res.LastInsertId()
	if err != nil {panic(err)}
	form.ID = id
	return true
}

func (db *DB) GetForm (id string) Form {
	query := `SELECT * FROM forms WHERE formID = ?`
	stmt, err := db.Prepare(query)
	if err != nil {panic(err)}
	form := Form{}
	err = stmt.QueryRow(id).Scan(&form.ID, &form.FormID, &form.FormName, &form.FormGeneratorObject, &form.DateCreated)
	if err != nil {panic(err)}
	return form
}

func (db *DB) GetForms() []Form {
	query := `SELECT * FROM forms`
	stmt, err := db.Prepare(query)
	if err != nil {panic(err)}
	rows, err := stmt.Query()
	if err != nil {panic(err)}
	forms := []Form{}
	for rows.Next() {
		form := Form{}
		err = rows.Scan(&form.ID, &form.FormID, &form.FormName, &form.FormGeneratorObject, &form.DateCreated)
		if err != nil {panic(err)}
		forms = append(forms, form)
	}
	return forms
}
