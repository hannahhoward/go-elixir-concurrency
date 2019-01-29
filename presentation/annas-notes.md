* Concurrency provides a natural method for composing asynchronous code.
* Concurrency allows your program to avoid blocking user operations.
* Concurrency provides one of the easiest ways take advantage of multi core systems.



1. In the beginning, computers did not have operating systems and were designed to execute a single program from beginning to end — each program had access to all of the machine’s resources.
  2. Over time, operating systems evolved to allow multiple programs to execute at once, each within a process — an independently isolated program that is assigned resources like memory, file handles, and security controls. 
3. Processes allowed computers to handle multiple users and multiple programs, better allocating its scarce resources.


Process:
* An executing instance of a program is called a process.
* Some operating systems use the term ‘task‘ to refer to a program that is being executed.
* A process is always stored in the main memory also termed as the primary memory or random access memory.
* Therefore, a process is termed as an active entity. It disappears if the machine is rebooted.
* Several process may be associated with a same program.
* On a multiprocessor system, multiple processes can be executed in parallel.
* On a uni-processor system, though true parallelism is not achieved, a process scheduling algorithm is applied and the processor is scheduled to execute each process one at a time yielding an illusion of concurrency.
* Example: Executing multiple instances of the ‘Calculator’ program. Each of the instances are termed as a process.
Thread:
* A thread is a subset of the process.
* It is termed as a ‘lightweight process’, since it is similar to a real process but executes within the context of a process and shares the same resources allotted to the process by the kernel.
* Usually, a process has only one thread of control – one set of machine instructions executing at a time.
* A process may also be made up of multiple threads of execution that execute instructions concurrently.
* Multiple threads of control can exploit the true parallelism possible on multiprocessor systems.
* On a uni-processor system, a thread scheduling algorithm is applied and the processor is scheduled to run each thread one at a time.
* All the threads running within a process share the same address space, file descriptors, stack and other process related attributes.
* Since the threads of a process share the same memory, synchronizing the access to the shared data within the process gains unprecedented importance.
Let’s recap.
* Concurrency: Concurrency is the scheduling of work to happen over multiple processors (or multiple nodes in a system). Concurrency implies that each unit of work is continuously making progress.
* Parallelism: Parallelism happens when at least two units of work are executing simultaneously. It’s notable that you can support concurrency on a single processor system using appropriate scheduling, while parallelism requires multiple processors or systems.
* Process: A process is an instance of a computer program that is being executed. It contains the program code and its current activity. Depending on the operating system, a process may have multiple threads of execution running concurrently.
* Thread: A thread of execution is managed independently by a scheduler, which is typically a part of the operating system. Multiple threads can exist within one process, executing concurrently and sharing resources.
* Green Thread: Green threads are scheduled by a runtime library or virtual machine instead of natively by the underlying operating system. Green threads emulate multithreaded environments without relying on any native OS capabilities.



image of process and threads - 	https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Multithreaded_process.svg/900px-Multithreaded_process.svg.png



Actor Model -
  -
	The actor model is a conceptual model to deal with concurrent computation. It defines some general rules for how the system’s components should behave and interact with each other.
	- An actor is the primitive unit of computation. It’s the thing that receives a message and do some kind of computation based on it.

he idea is very similar to what we have in object-oriented languages: An object receives a message (a method call) and does something depending on which message it receives (which method we are calling).

The main difference is that actors are completely isolated from each other and they will never share memory. It’s also worth noting that an actor can maintain a private state that can never be changed directly by another actor.

In the actor model everything is an actor and they need to have addresses so one actor can send a message to another.

multiple actors can run at the same time, an actor will process a given message sequentially. This means that if you send 3 messages to the same actor, it will just execute one at a time. To have these 3 messages being executed concurrently, you need to create 3 actors and send one message to each.

Messages are sent asynchronously to an actor, that needs to store them somewhere while it’s processing another message. The mailbox is the place where these messages are stored.


When an actor receives a message, it can do one of these 3 things:
* Create more actors
* Send messages to other actors
* Designate what to do with the next message

This last point means how the state will look for the next message this actor receives



Fault tolerance

Erlang “let it crash” philosophy
What Erlang does is simply letting it crash, but make this critical code be supervised by someone whose only responsibility is to know what to do when this crash happens (like resetting this unit of code to a stable state), and what makes it all possible is the actor model.



Every code run inside a process (that is basically how Erlang calls its actors). This process is completely isolated, meaning its state is not going to influence any other process. We have a supervisor, that is basically another process(everything is an actor, remember?), that will be notified when the supervised process crashes and then can do something about it.

This makes it possible to create systems that “self heal”, meaning that if an actor gets to an exceptional state and crashes, by whatever reason, a supervisor can do something about it to try to put it in a consistent state again (and there are multiple strategies to do that, the most common being just to restart the actor with its initial state).


Distribution
Another interesting aspect of the actor model is that it doesn’t matter if the actor that I’m sending a message to is running locally or in another node.
Think about it, if an actor is just this unit of code with a mailbox and an internal state, and it just respond to messages, who cares in which machine it’s actually running? As long as we can make the message get there we are fine. This allows us to create systems that leverage multiple computers and helps us to recover if one of them fail.



https://www.brianstorti.com/the-actor-model/




CSP
* 		Communication through channels
* 		Processes are "anonymous"


https://arild.github.io/csp-presentation/#22


* In CSP processes communicate using channels. Program can create and pass them around as first class objects. Actors have an address system and inboxes. Only one address per process.
* In CSP send and receive operation may block. In Actors Model only receive operation may block.
* In CSP messages are delivered in order they were send, in Actors model it’s not the case. In fact system may not be able to deliver some messages at all.
* So far CSP model works best on one machine, while Actors model scales easily across several machines.


https://cs.stackexchange.com/questions/19506/differences-between-the-actor-model-and-communicating-sequential-processes-csp

unbounded indeterminacy is a property of concurrency by which the amount of delay in servicing a request can become unbounded as a result of arbitration of contention for shared resources while still guaranteeing that the request will eventually be serviced.

CSP may have bounded or unbounded non-determinism
* actors have variable topology whereas CSP has fixed topology
* actors have the principle of locality, CSP does not have locality
* actors are designed around their behaviour, CSP doesn't not necessarily have this

