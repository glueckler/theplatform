package db

import (
	"strings"
	"fmt"
)
// Pass in bcID (booked course ID), as well as TMD (table maker data ~ from form builder)
func (db *DB) CreateTable(tableName string, TMD map[string]string) string {
	var values string
	for col, val := range TMD {
		values += strings.Replace(col, " ", "_", -1) + ` ` + val + `, `
	}
	values = strings.TrimSuffix(values, `, `)
	query := `create table `+tableName+` (`+values+`)`
	fmt.Println(query)
	stmt, err := db.Prepare(query)
	if err != nil {
		panic(err)
	}
	_, err = stmt.Exec()
	if err != nil {
		panic(err)
	}
	return tableName
}