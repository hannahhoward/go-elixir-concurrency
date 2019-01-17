package counter

type counterMessage interface {
	handle(c * Counter)
}

type Counter struct {
	counterMessages chan counterMessage

	// do not touch outside run loop
	value int
}

// New creates a new counter process
func New(done <-chan struct{}, value int) * Counter {
	counter := &Counter{
		counterMessages: make(chan counterMessage, 16),
		value: value
	}
	go counter.run(done)
	return counter
}

type incrementMessage struct {}

func (c * Counter) Increment() {
	c.counterMessages <- &incrementMessage{}
}

type decrementMessage struct {}

func (c * Counter) Decrement() {
	c.counterMessages <- &decrementMessage{}
}

type getValueMessage struct {
	valueChan chan<-int
}

func (c * Counter) GetValue() int {
	valueChan := make(chan int)
	c.counterMessages <- &getValueMessage{valueChan}
	return <-valueChan
}

func (c * Counter) run(done <-chan struct{}) {
	for {
		select {
		case <-done:
			return
		case message := <-c.counterMessages:
			message.handle(c)
		}
	}
}

func (im * incrementMessage) handle(c *Counter) {
	c.value++
}

func (dm * decrementMessage) handle(c *Counter) {
	c.value--
}

func (gvm * getValueMessage) handle(c *Counter) {
	gvm.valueChan <- c.value
}




