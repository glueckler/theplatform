package auth

import (
	"github.com/golang/oauth2"
	"crypto/rand"
	"encoding/base64"
	"io/ioutil"
	"github.com/labstack/gommon/log"
	"os"
	"encoding/json"
	"golang.org/x/oauth2/google"
	"github.com/labstack/echo"
)

// Credentials which stores google ids
type Credentials struct {
	Cid string 	   `json:"cid"`
	Csecret string `json:"csecret"`
}

// User is a retrieved and authenticated user.
type User struct {
	Sub string `json:"sub"`
	Name string `json:"name"`
	GivenName string `json:"given_name"`
	FamilyName string `json:"family_name"`
	Profile string `json:"profile"`
	Picture string `json:"picture"`
	Email string `json:"email"`
	EmailVerified string `json:"email_verified"`
	Gender string `json:"gender"`
}

var cred Credentials
var conf *oauth2.Config
var state string

func randToken() string {
	b := make([]byte, 32)
	rand.Read(b)
	return base64.StdEncoding.EncodeToString(b)
}

func init() {
	file, err := ioutil.ReadFile("./creds.json")
	if err != nil {
		log.Printf("File error: %v\n", err)
		os.Exit(1)
	}
	json.Unmarshal(file, &cred)

	conf = &oauth2.Config{
		ClientID:     cred.Cid,
		ClientSecret: cred.Csecret,
		RedirectURL:  "http://127.0.0.1:1323/auth",
		Scopes: []string{
			"https://www.googleapis.com/auth/userfinfo.email",
		},
		Endpoint: google.Endpoint,
	}
}

func getLoginURL(state string) string {
	return conf.AuthCodeURL(state)
}

func authHandler(c *echo.Context) {
	// Handle the exchange code to initiate a transport.
	session := sessions.Default(c)
	retrievedState := e
}








