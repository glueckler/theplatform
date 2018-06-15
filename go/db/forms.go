package db

import "encoding/json"

func (db *DB) GetTableMakerData(formID string) map[string]string {
	query := `SELECT tableMakerData FROM forms WHERE formID = ?`
	stmt, err := db.Prepare(query)
	if err != nil {panic(err)}
	var jsonString string
	stmt.QueryRow(formID).Scan(&jsonString)
	var TMD map[string]string
	json.Unmarshal([]byte(jsonString), &TMD)
	return TMD
}
