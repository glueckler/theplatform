package locations

type Location struct {
	coords []float32
	address address
}

type address struct {
	streetNumber int
	streetName string
	postalCode string
	province string
	country string
}