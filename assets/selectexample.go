package main

import (
	"fmt"
	"math/rand"
	"time"
)

func sleepNotify(duration time.Duration, done chan<- struct{}) {
	time.Sleep(duration)
	done <- struct{}{}
}

func main() {
	c1 := make(chan struct{})
	c2 := make(chan struct{})
	d1 := time.Duration(rand.Intn(1000))
	d2 := time.Duration(rand.Intn(1000))
	go sleepNotify(d1*time.Microsecond, c1)
	go sleepNotify(d2*time.Microsecond, c2)
	for i := 0; i < 2; i++ {
		select {
		case <-c1:
			fmt.Println("Finished on channel 1")
		case <-c2:
			fmt.Println("Finished on channel 2")
		}
	}
}
