# Hannah's Research Notes

### Concurrency Models


Go's concurrency model is based on CSP, or Communicating Sequential Processes
---
Elixirs concurrency model is based on the Actor Model

#### Similarities

The two models are both similar in that they share data by communicating rather than communicate through shared data.

In other words the way to send data back and forth between processes is with message passing.

This differs from a traditional threaded model in which concurrent threads often hold the same data structure and then synchronize through some sort of lock on that structure (i.e. a mutex, for example)

#### Differences

The wikipedia section on this, which I thought was pretty useful:

Comparison with the actor model
---
In as much as it is concerned with concurrent processes that exchange messages, the Actor model is broadly similar to CSP. However, the two models make some fundamentally different choices with regard to the primitives they provide:

- CSP processes are anonymous, while actors have identities.

Hannah's notes: once I start a go routine, I have NO way to reference it. The only way I an reach it is through a channel it's listening on

- CSP uses explicit channels for message passing, whereas actor systems transmit messages to named destination actors. These approaches may be considered duals of each other, in the sense that processes receiving through a single channel effectively have an identity corresponding to that channel, while the name-based coupling between actors may be broken by constructing actors that behave as channels.

Hannah's notes: CSP contains a built in level of indirection. Instead of process A sending a message to Process B, Process A sends a message to Channel B, which is read by Process C, or Process D, or Process E -- whomever happens to be listening. However -- that doesn't mean it's a broadcast - whoever reads Channel B first gets the message, no one else.

I really like the equivalency point here -- if only Process B reads from Channel B, Channel B is effectively an identifier for Process B. Alternatively, if you wanted to build a channel in an actor model language, you can effectively build a process that behaves like a channel (I found https://github.com/jamesmacaulay/channel on the internet)

- CSP message-passing fundamentally involves a rendezvous between the processes involved in sending and receiving the message, i.e. the sender cannot transmit a message until the receiver is ready to accept it. In contrast, message-passing in actor systems is fundamentally asynchronous, i.e. message transmission and reception do not have to happen at the same time, and senders may transmit messages before receivers are ready to accept them. These approaches may also be considered duals of each other, in the sense that rendezvous-based systems can be used to construct buffered communications that behave as asynchronous messaging systems, while asynchronous systems can be used to construct rendezvous-style communications by using a message/acknowledgement protocol to synchronize senders and receivers.

Hannah's notes: In short, CSP is message passing is synchronous where actor model is asynchronous. However, each model can be built with the other. Synchronous message passing is easy to build in an actor model language through a send / acknowledgement message combo (in fact pretty much was GenServer.call does under the hood, but with an actual response instead of an acknowledgement). Similarly, an unbounded asynchronous queue can be built in Go with two channels and an intermediate process -- good article here: https://medium.com/capital-one-tech/building-an-unbounded-channel-in-go-789e175cd2cd

# Implementations

# Similarities

Both Erlang and Go implement the concurrency models ON TOP of the operating system, rather than using OS primitives. In other words neither a Go Routine or an Erlang Process are an OS thread or an OS process. 

Go and Erlang place Go Routines / Processes on OS threads through a runtime scheduler.

That means both operating systems ship with a runtime library -- code that every program in the language must have bundled into an executable to run

# Differences

1. Strictness

Erlang implements the actor model FAIRLY STRICTLY - processes are 100% isolated from each other and can only communicate through message passing.

Go's implementation of CSP is LOOSE TO SAY THE LEAST. Processes share all memory -- even though Go's documentation emphasizes "share memory by communicating rather than communicate by sharing memory". Go provides a complete set of tools for using traditional concurrency primitives with the "sync" package and even encourages not overrelying on channels when a mutex will do. From [Effective Go](https://golang.org/doc/effective_go.html#sharing):

```
To encourage this way of thinking we have reduced it to a slogan:

Do not communicate by sharing memory; instead, share memory by communicating.

This approach can be taken too far. Reference counts may be best done by putting a mutex around an integer variable, for instance. But as a high-level approach, using channels to control access makes it easier to write clear, correct programs.
```

Go is almost completely non prescriptive -- you have full CSP implementation (minus the process isolation) -- but you also have all the facilities to write a concurrent program exactly the same way you would in Java or C

2. High Level Abstractions

In Erlang, OTP, effectively a standard library, provides several higher level abstractions on top of processes (a.k.a. behaviors -- i.e. gen servers, supervisors, etc). Most people who write Erlang use OTP abstractions rather than processes directly

Go relies on third party libraries to provide higher level abstractions, if people want them. As a result, most people who write Go actually work with the underlying primitives -- goroutines and channels, rather than higher level behaviors.

3. Compiled To Native Vs Compiled To VM

While both Go and Erlang need a runtime in their programs in order to run, Erlang programs are only compiled to a bytecode and the Erlang runtime is a complete virtual machine ala the Java VM

Go programs are compiled all the way down to machine code and the runtime is just the scheduler and a few other utitlies

The tradeoff is between speed and size (Go wins) vs cross-platform compatability - bytecode can run anywhere

4. Cooperative scheduling vs Pre-emptive scheduling

This somewhat blew my mind. The Go scheduler is cooperative -- there are certain types of operations that cause a go routine to yield control to the scheduler, but otherwise the go routine will continue to execute. In Erlang, the scheduler can effectively interrupt a process anywhere. This means the following Go code behaves differently than you might expect:

```go
package main

import "fmt"
import "runtime"
import "time"

func cpuIntensive(p *int) {
  for i := 1; i <= 100000000000; i++ {
    *p = i
  }
}

func main() {
  runtime.GOMAXPROCS(1)

  x := 0
  go cpuIntensive(&x)

  time.Sleep(100 * time.Millisecond)

  // printed only after cpuIntensive is completely finished
  fmt.Printf("x = %d.\n", x)
}
```

One would expect the go routine to eventually get "interrupted" in order to run the rest of the main() function, but it doesn't!

4. Localized message passing vs remote

A Go program is a self contained world. In other words, one go routine and only write to a channel that is read by other go routines on the SAME machine in the SAME overall go application.

Erlang messaging between processes can happen across applications or even across a different machines on a network.

### Observations

In general, Go seems to emphasize flexibility and programmer choice mixed an emphasis on performance

Elixir seems to emphasize strong, effective high level concurrency patterns that are harder to mess up, mixed with an emphasis on reliability and distributed deployment