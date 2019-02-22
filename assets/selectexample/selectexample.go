package main

import (
	"fmt"
	"math/rand"
	"time"
)

func main() {
	userInput := make(chan string)
	networkResponses := make(chan string)

	readUserInput := delayedResult(userInput)
	makeNetworkRequest := delayedResult(networkResponses)
	go readUserInput("applesauce")
	go makeNetworkRequest("some data")
	for i := 0; i < 2; i++ {
		select {
		case userTyped := <-userInput:
			fmt.Printf("User typed: %s\n", userTyped)
		case networkData := <-networkResponses:
			fmt.Printf("Data came in from network: %s\n", networkData)
		}
	}
}

func delayedResult(done chan<- string) func(string) {
	return func(result string) {
		duration := time.Duration(rand.Intn(1000))
		time.Sleep(duration)
		done <- result
	}
}
