package db

import (
	"database/sql"
	"fmt"
	"strconv"
	"ThePlatform/go/util"
)

func (db *DB) QueryDB(QD map[string]interface{}) map[string]map[string]string {
	var err error
	stmt, err := db.Prepare(QD["query"].(string))
	util.Check(err)
	rows, err := stmt.Query()
	util.Check(err)
	return db.dynamicQueryRows(rows)
}

func (db *DB) dynamicQueryRows(rows *sql.Rows) map[string]map[string]string {
	cols, err := rows.Columns()
	util.Check(err)
	//m := make(map[string]interface{})
	count := len(cols)
	values := make([]interface{}, count)
	valuePtrs := make([]interface{}, count)
	final_result := map[string]map[string]string{}
	result_id := 0
	for rows.Next() {
		for i := range cols {
			valuePtrs[i] = & values[i]
		}
		rows.Scan(valuePtrs...)

		tmp_struct := map[string]string{}

		for i, col := range cols {
			var v interface{}
			val := values[i]
			b, ok := val.([]byte)
			if (ok) {
				v = string(b)
			} else {
				v = val
			}
			tmp_struct[col] = fmt.Sprintf("%s", v)
		}

		final_result[strconv.Itoa(result_id)] = tmp_struct
		result_id++

		//// Create a slice of interface to represent each column,
		//// And a second slice to contain pointers to each item in the columns slice
		//columns := make([]interface{}, len(cols))
		//columnPointers := make([]interface{}, len(cols))
		//for i := range columns {
		//	columnPointers[i] = &columns[i]
		//}
		//// Scan the result into the column pointers...
		//err := rows.Scan(columnPointers...)
		//util.Check(err)
		//// Create our map, retrieve the value for each column
		//// from the pointers slice, storing it in the map with
		//// the name of the column as the key
		//
		//for i, colName := range cols {
		//	val := columnPointers[i].(*interface{})
		//	var newVal string
		//	//if fmt.Sprintf("%T", *val) == "[]uint8" {
		//	//	newVal = string(*val)
		//	//}
		//	fmt.Printf("%T", *val)
		//	m[colName] = newVal
		//}
	}
	fmt.Println(final_result)
	return final_result
}