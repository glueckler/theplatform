package db

import "github.com/satori/go.uuid"

type Location struct {
	ID			 int64
	LocationID   string
	LocationName string `json:"locationName"`
	AddressLn1   string	`json:"addressLn1"`
	AddressLn2   string `json:"addressLn2"`
	City		 string `json:"city"`
	State 	   	 string `json:"state"`
	PostalCode   string `json:"postalCode"`
	Coords	     string `json:"coords"`
}

func (db *DB) CreateLocation (location *Location) (bool) {
	query := `INSERT INTO locations (locationID, locationName, addressLn1, addressLn2, city, state, postalCode, coords) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
	stmt, err := db.Prepare(query)
	if err != nil {panic(err)}
	randomID, err := uuid.NewV4()
	if err != nil {panic(err)}
	location.LocationID = randomID.String()
	res, err := stmt.Exec(location.LocationID, location.LocationName, location.AddressLn1, location.AddressLn2, location.City, location.State, location.PostalCode, location.Coords)
	if err != nil {panic(err)}
	id, err := res.LastInsertId()
	if err != nil {panic(err)}
	location.ID = id
	return true
}

func (db *DB) GetLocation (id string) Location {
	query := `SELECT * FROM locations WHERE locationID = ?`
	stmt, err := db.Prepare(query)
	if err != nil {panic(err)}
	location := Location{}
	err = stmt.QueryRow(id).Scan(&location.ID, &location.LocationID, &location.LocationName, &location.AddressLn1, &location.AddressLn2, &location.City, &location.State, &location.PostalCode, &location.Coords)
	if err != nil {panic(err)}
	return location
}

func (db *DB) GetLocations() []Location {
	query := `SELECT * FROM locations`
	stmt, err := db.Prepare(query)
	if err != nil {panic(err)}
	rows, err := stmt.Query()
	if err != nil {panic(err)}
	locations := []Location{}
	for rows.Next() {
		location := Location{}
		err = rows.Scan(&location.ID, &location.LocationID, &location.LocationName, &location.AddressLn1, &location.AddressLn2, &location.City, &location.State, &location.PostalCode, &location.Coords)
		if err != nil {panic(err)}
		locations = append(locations, location)
	}
	return locations
}