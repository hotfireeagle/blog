package main

import (
	"blog/restful"
	"log"
)

func main() {
	log.Println("Main log...")
	log.Fatal(restful.RunAPI("127.0.0.1:8000"))
}
