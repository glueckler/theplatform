package db

import (
	"database/sql"
	"ThePlatform/go/util"
	_ "github.com/go-sql-driver/mysql"
	)

type DB struct {
	*sql.DB
}

func Connect(connectionString string) DB  {
	db, err := sql.Open("mysql", connectionString)
	util.Check(err)
	err = db.Ping()
	util.Check(err)
	return DB{db}
}
