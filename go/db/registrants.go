package db

type Registrant struct {
	ID              int
	UserID 		    string  `json:"userID"`
	BookedCourseID  string 	`json:"bookedCourseID"`
	Price  		    float32
	AmtPayed	    float32
	HasPayed   	    bool
	DateRegistered  string
}


func (db *DB) GetRegistrants() []Registrant {
	query := `SELECT * FROM registrants`
	stmt, err := db.Prepare(query)
	if err != nil {panic(err)}
	rows, err := stmt.Query()
	if err != nil {panic(err)}
	registrants := []Registrant{}
	for rows.Next() {
		registrant := Registrant{}
		err = rows.Scan(&registrant.ID, &registrant.UserID, &registrant.BookedCourseID, &registrant.Price, &registrant.AmtPayed, &registrant.HasPayed, &registrant.DateRegistered)
		if err != nil {panic(err)}
		registrants= append(registrants, registrant)
	}
	return registrants
}

func (db *DB) GetRegistrant (id string) Registrant {
	query := `SELECT * FROM registrants WHERE registrantID = ?`
	stmt, err := db.Prepare(query)
	if err != nil {panic(err)}
	registrant := Registrant{}
	err = stmt.QueryRow(id).Scan(&registrant.ID, &registrant.UserID, &registrant.BookedCourseID, &registrant.Price, &registrant.AmtPayed, &registrant.HasPayed, &registrant.DateRegistered)
	if err != nil {panic(err)}
	return registrant
}

