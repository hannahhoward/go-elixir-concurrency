package main

import "fmt"

func read(incoming <-chan string, done chan<- struct{}) {
	readValue := <-incoming
	fmt.Printf("%s\n", readValue)
	done <- struct{}{}
}

func write(outgoing chan<- string, done chan<- struct{}) {
	outgoing <- "bananas"
	done <- struct{}{}
}

func main() {
	channel := make(chan string)
	done := make(chan struct{})
	go read(channel, done)
	go write(channel, done)
	<-done
	<-done
	fmt.Println("Finished")
}
