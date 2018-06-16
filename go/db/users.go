package db

import (
	"github.com/satori/go.uuid"
	"fmt"
)

type User struct {
	ID         int64
	UserID     string  `json:"userID"`
	FName      string  `json:"fName"`
	LName      string  `json:"lName"`
	Email      string  `json:"email"`
	AddressID  string  `json:"addressID"`
	Phone      int     `json:"phone"`
}

func (db *DB) GetUser (id string) User {
	query := `SELECT * FROM users WHERE userID = ?`
	stmt, err := db.Prepare(query)
	if err != nil {panic(err)}
	user := User{}
	err = stmt.QueryRow(id).Scan(&user.ID, &user.UserID, &user.FName, &user.LName, &user.Email, &user.AddressID, &user.Phone)
	if err != nil {panic(err)}
	return user
}

func (db *DB) DeleteUser (id string) int64 {
	query := `DELETE FROM users WHERE userID = ?`
	stmt, err := db.Prepare(query)
	if err != nil {panic(err)}
	res, err := stmt.Exec(id)
	if err != nil {panic(err)}
	AR, _ := res.RowsAffected()
	return AR
}

func (db *DB) GetUsers() []User {
	fmt.Println("FUNCTION REACHED")
	query := `SELECT * FROM users`
	stmt, err := db.Prepare(query)
	if err != nil {panic(err)}
	rows, err := stmt.Query()
	if err != nil {panic(err)}
	users := make([]User, 3)
	for rows.Next() {
		user := User{}
		err = rows.Scan(&user.ID, &user.UserID, &user.FName, &user.LName, &user.Email, &user.AddressID, &user.Phone)
		fmt.Println(user)
		if err != nil {panic(err)}
		users = append(users, user)
	}
	return users
}

func (db *DB) CreateUser (user *User) (bool) {
	query := `INSERT INTO users (userID, fName, lName, email, addressID, phone) VALUES (?, ?, ?, ?, ?, ?)`
	stmt, err := db.Prepare(query)
	if err != nil {panic(err)}
	randomID, err := uuid.NewV4()
	if err != nil {panic(err)}
	user.UserID = randomID.String()
	res, err := stmt.Exec(user.UserID, user.FName, user.LName, user.Email, user.AddressID, user.Phone)
	if err != nil {panic(err)}
	id, err := res.LastInsertId()
	if err != nil {panic(err)}
	user.ID = id
	return true
}