package db

import (
	"strings"
	"fmt"
)

func (db *DB) DeleteRow (tableName, field, val string) int64 {
	query := `DELETE FROM `+tableName+` WHERE `+field+` = "` + val + `"`
	fmt.Println("*******************************")
	fmt.Println(query)
	fmt.Println("*******************************")
	stmt, err := db.Prepare(query)
	if err != nil {panic(err)}
	res, err := stmt.Exec()
	if err != nil {panic(err)}
	AR, _ := res.RowsAffected()
	return AR
}

func (db *DB) UpdateRow(tableName, fieldReferance, val string, updateData map[string]string) (int64, bool) {
	updateString := ``
	for fieldName, newVal := range updateData {
		updateString += fieldName + ` = '` + newVal + `', `
	}
	updateString = strings.TrimSuffix(updateString, ", ")
	fmt.Println("*******************************")
	fmt.Println(updateString)
	fmt.Println("*******************************")
	query := `UPDATE `+tableName+` SET ` + updateString + ` WHERE `+ fieldReferance +` = "` + val + `"`
	fmt.Println("*******************************")
	fmt.Println(query)
	fmt.Println("*******************************")
	stmt, err := db.Prepare(query)
	if err != nil {panic(err)}
	res, err := stmt.Exec()
	if err != nil {panic(err)}
	rowAffected, err := res.RowsAffected()
	if err != nil {panic(err)}
	return rowAffected, true
}
