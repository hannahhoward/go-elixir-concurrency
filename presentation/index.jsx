// Import React
import React from 'react'
import '../assets/prism-tomorrow-ally.css'

// Import Spectacle Core tags
import {
  BlockQuote,
  Cite,
  Deck,
  Heading,
  ListItem,
  List,
  Quote,
  Slide,
  Text,
  Notes
} from 'spectacle'

import AboutMeSlide from './slideTemplates/about-me-slide.jsx'
import AboutMeSlideAnna from './slideTemplates/about-me-slide-anna.jsx'
import QuoteSlide from './slideTemplates/quote-slide.jsx'
import DefinitionSlide from './slideTemplates/definition-slide.jsx'
import ListSlide from './slideTemplates/list-slide.jsx'
import SimpleSlide from './slideTemplates/simple-slide.jsx'
import ConceptSlide from './slideTemplates/concept-slide.jsx'
import ImageSlide from './slideTemplates/image-slide.jsx'
import DoubleImageSlide from './slideTemplates/double-image-slide.jsx'
import QuotesSlide from './slideTemplates/quotes-slide.jsx'
import colors from './slideTemplates/colors'
import CodeSlide from 'spectacle-code-slide'

// Import image preloader util
import preloader from 'spectacle/lib/utils/preloader'
preloader({})
// Import theme
import createTheme from 'spectacle/lib/themes/default'
import aboutMeSlideAnna from './slideTemplates/about-me-slide-anna.jsx'

// Require CSS
require('normalize.css')
// use colors in slideTemplates/colors.js to construct theme
const theme = createTheme(colors, {
  primary: 'Montserrat',
  secondary: 'Helvetica'
})

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck
        transition={['zoom', 'slide']}
        transitionDuration={500}
        theme={theme}
      >
        <AboutMeSlide>
          <Notes>
            <p>Anna: Hi Everyone!</p>
            <p>
              Anna: Before we get started we're gonna briefly introduce
              ourselves
            </p>
            <p>
              Anna: I'm Anna, I'm a developer at Carbon Five. That's my contact
              info there.
            </p>
            <p>
              Hannah: I'm Hannah, I'm also a developer at Carbon Five. And
              there's my contact info as well.
            </p>
            <p>
              Hannah: Carbon Five for those who don't know is a product
              development agency. We work with all kinds of clients, from small
              startups to large corporations, to turn their ideas, no matter
              what stage they're at, into working software. We're hiring and
              we're hirable. If you'd like to know more, you can come find
              either of us after the talk is over.
            </p>
            <p>Hannah: And now I'll turn it over to Anna to kick this off.</p>
          </Notes>
        </AboutMeSlide>
        <DoubleImageSlide
          fit={false}
          image2="elixir_logo.png"
          image1="gophercolor.png"
          title="Go vs. Elixir"
          text="A Concurrency Comparison"
        >
          <Notes>
            <p>
              So the motivation for this talk came from a many conversatiosn
              both Hannah and I have had about concurrency - where Go and Elixir
              are often thrown into the conversation as options. And while both
              do allow for concurrency...
            </p>
          </Notes>
        </DoubleImageSlide>
        <ImageSlide image="tradeoffs.png">
          <Notes>
            <p> As with everything there are tradeoffs</p>
          </Notes>
        </ImageSlide>
        <ImageSlide image="go-vs-elixir.jpg">
          <Notes>
            <p>
              And when we are looking Go vs Elixir what we are really looking at
              today are the concurrency models of the the two.
            </p>

            <p>
              We are not really talking about one versus the other. In this case
              we are comparing.
            </p>

            <p>
              The actor model in Erlang(Elixir) vs Communicating Sequential
              Processes in Go.
            </p>

            <p>
              But before we talk about that - let's take a look at how we might
              define concurrency
            </p>
          </Notes>
        </ImageSlide>
        <ImageSlide image="homer-computer.gif">
          <Notes>
            <p>Where did this start?</p>
          </Notes>
        </ImageSlide>

        <ImageSlide image="single-threaded.png">
          <Notes>
            <p>
              In the beginning, computers did not have operating systems and
              were designed to execute a single program from beginning to end
            </p>
            <p>Each program had access to all of the machine’s resources.</p>
          </Notes>
        </ImageSlide>
        <ImageSlide image="multi-threaded.png">
          <Notes>
            <p>
              Over time, operating systems evolved to allow multiple programs to
              execute at once
            </p>
            <p>each within a process</p>
            <p>
              On a multiprocessor system, multiple processes can be executed in
              parallel
            </p>
          </Notes>
        </ImageSlide>

        <ImageSlide image="multi-tasking.png">
          <Notes>
            <p>So how is it that this is possible?</p>
          </Notes>
        </ImageSlide>

        <ImageSlide inverted image="process-explained.jpg">
          <Notes>
            <p>It's not. We fake it.</p>
            <p>
              While it is true that at a particular instant in time, only one
              process can actually be running on a computer with only one CPU.
            </p>

            <p>
              {' '}
              However, the executable code for several processes is loaded into
              memory, and the processor switches rapidly between several jobs,
              giving the illusion that several jobs are running at once.
            </p>
            <p>
              At the risk of oversimplifying, a process can be in one of three
              states
            </p>
            <p>
              Running: the CPU is actually executing statements of this process.
              At any given instant, only one process can be running.
            </p>
            <p>
              Ready: the process is loaded into memory and runnable, but is not
              actually running; the CPU is doing something else.
            </p>
            <p>
              Blocked: the process is not runnable because it is waiting for an
              event to occur. The usual event is that it is waiting for an I/O
              operation to complete,
            </p>
          </Notes>
        </ImageSlide>

        <SimpleSlide inverted fit={false} statement="But we also have ">
          <Notes />
        </SimpleSlide>

        <ImageSlide inverted image="threads.gif">
          <Notes />
        </ImageSlide>

        <ImageSlide inverted image="process-thread.jpg">
          <Notes>
            <p>thread subset of process</p>
            <p>threads of a process share the same memory</p>
            <p>
              It is termed as a ‘lightweight process’, since it is similar to a
              real process but executes within the context of a process and
              shares the same resources allotted to the process by the kernel.
            </p>
          </Notes>
        </ImageSlide>

        <SimpleSlide inverted fit={false} statement="So how is this relevant?">
          <Notes>
            <p>
              Well now we have these more robust machines we can do more things
              at once. How can we leverage our applications to do more things at
              once
            </p>
          </Notes>
        </SimpleSlide>

        <ImageSlide inverted image="concurrency-vs-parallelism.png">
          <Notes>
            <p>Let's say you have 5 people assembling 5 single bed</p>
            <p>
              You can imagine that the instructions look pretty straight forward
            </p>
            <p>Now imagine you had 5 people assembling a single bed</p>
            <p>
              {' '}
              What would those instructions look like the instructions to ensure
              that no one has to wait for anyone to finishe a step and we get a
              finished bed as a result
            </p>
            <p>This feels a lot more complex</p>
          </Notes>
        </ImageSlide>

        <QuoteSlide
          inverted
          quote="“Concurrency is the composition of independently executing processes, while parallelism is the simultaneous execution of computations“"
        />
        <SimpleSlide
          inverted
          fit={false}
          statement="Parallelism is about executing many things at once. It's focus is execution"
        >
          <Notes />
        </SimpleSlide>

        <SimpleSlide
          inverted
          fit={false}
          statement="Concurrency is about dealing with many things at once. It's focus is structure"
        >
          <Notes>It requires coordination</Notes>
        </SimpleSlide>

        <SimpleSlide
          inverted
          fit={false}
          statement="Coordination introduces complexity..."
        >
          <Notes>Good lead off for Hannah to discuss coordination</Notes>
        </SimpleSlide>

        <SimpleSlide
          fit={false}
          statement="How do we coordinate between tasks working together?"
        >
          <Notes>
            So I'm going to shift gears and talk about coordination for a bit --
            how we organize work between multiple potentially paraellel tasks
            that are working together?
          </Notes>
        </SimpleSlide>
        <ImageSlide
          fit={false}
          inverted
          title="The Problem"
          image="double-keyboard.gif"
          text="Concurrency Without Coordination"
        >
          <Notes>
            <p>First of all let's talk about why we need to coordinate.</p>

            <p>
              Anna said that the goal of concurrency is keep our work unblocked
              -- moving fast, and potentially in parallel.
            </p>

            <p>
              But multiple things happening in parallel, doesn't neccesarily
              accomplish anything, as this somewhat infamous NCIS image shows
            </p>
          </Notes>
        </ImageSlide>
        <ListSlide
          ordered={false}
          inverted
          title="Threads coordinate by sharing data"
          list={[
            'Use same memory space',
            'Use mutation on shared state to communicate',
            'Use various locks to prevent overwriting each others work'
          ]}
        >
          <Notes>
            <p>
              So the simplest way to do this, and the way it's been done
              traditionally, is to use the fact that threads share the same
              memory space.
            </p>
            <p>
              So if we both have access to a common data structure we can use
              mutations to communicate the work we're doing
            </p>
            <p>
              We have to be careful cause we don't want to override each others
              work, so we'll need various locking mechanisms to serialize access
              to data structures -- some of the most common are called mutexs
              and semaphores
            </p>
          </Notes>
        </ListSlide>
        <ImageSlide
          fit={false}
          inverted
          title="Threads"
          image="Rundmc.jpg"
          text="Old School Concurrency"
        >
          <Notes>
            Threads are the original basis for writing concurrent programs --
            because they're already built into the operating system, and
            communicating through sharing data is something you basically can
            get for free. Maybe you need a few locking mechanism, but they're
            generally really simple.
          </Notes>
        </ImageSlide>
        <SimpleSlide
          fit={false}
          inverted
          statement="Most widely used programming languages support threads."
        >
          <Notes>
            <p>
              And as a result, the vast majority of traditional programming
              languages support using threads, and provide the basic mechanisms
              for communicating with shared data
            </p>
          </Notes>
        </SimpleSlide>
        <ImageSlide
          fit={false}
          inverted
          title="Mo Threads"
          image="biggie.jpg"
          text="Mo Problems"
        >
          <Notes>
            <p>
              As a basic way to coordinate work, communicating with shared data
              through threads is really simple and easy. The problem is, it
              doesn't scale. What starts off simple gets unwielding once you've
              got a complex set of coordinate jobs
            </p>
          </Notes>
        </ImageSlide>
        <ListSlide
          inverted
          title="Challenges With Threads"
          list={[
            'Lots of shared mutable state',
            'Dead locks / unpredictabiity',
            'Expontential complexity to manage'
          ]}
        >
          <Notes>
            <p>
              And before you know it you've run smack into the classic problems
              with this approach
            </p>
            <p>
              First of all, the entire mechanism is dependent on shared, mutable
              state. And as functional programmers, we know this has all kinds
              of unpredictabiity
            </p>
            <p>
              Second, who writes first gets very unpredictable, and if you use
              locking mechanisms and you forget to unlock, you can freeze your
              program
            </p>
            <p>
              Fundamentally though these the complexity of managing shared state
              basically grows Expontentially as you add more threads and more
              state, rather than linearly
            </p>
            <p>
              And it's the problems with these approaches that lead to the
              models we're going to look at in Elixir and Go for solving
              concurrency issues
            </p>
          </Notes>
        </ListSlide>

        <SimpleSlide fit={false} statement="The Actor Model">
          <Notes>
            Let's talk about how Erlang(Elixir) deal with coordination
          </Notes>
        </SimpleSlide>

        <SimpleSlide fit={false} statement="Invented by Carl Hewitt 1973">
          <Notes>Fun Fact</Notes>
        </SimpleSlide>

        <SimpleSlide fit={false} statement="Erlang created in 1986">
          <Notes>
            <p>
              Creators of Erlang were not aware of the actor model when they
              wrote erlang...which speaks to the promise of this design pattern
            </p>
          </Notes>
        </SimpleSlide>

        <SimpleSlide
          fit={false}
          statement="Conceptual model to deal with concurrent computation"
        />

        <SimpleSlide
          fit={false}
          statement="Defines some general rules for how the system’s
            components should behave and interact with each other"
        />

        <ImageSlide image="actor-model-mailbox.png">
          <Notes>
            <p>So this is an example of what it might look like</p>
            <p>What is going on here?</p>
            <p>
              Each of these Circles has a mailbox and this little box that says
              internal state
            </p>
            <p>
              Each of these units is an actor(and in Erlang/Elixir land is
              called a process)
            </p>
            <p>This processes are completely isolated from each other</p>
            <p>not OS processes</p>
            <p>they communciate by sending messages to each other</p>
            <p>
              They never share memory, which means they do not direcly share
              data
            </p>
            <p>
              And each of these processes maintains and internal state that
              cannot be accesses directly by another process
            </p>
          </Notes>
        </ImageSlide>

        <QuoteSlide
          inverted
          quote="One ant is no ant."
          cite="https://www.brianstorti.com/the-actor-model/"
        >
          <Notes />
        </QuoteSlide>

        <ImageSlide image="ant.gif">
          <Notes>
            <p>one ant cannot survive alone</p>
            <p>same idea for actors</p>
            <p>they come in systems</p>
            <p>in this model everything is an actor</p>
            <p>
              each actor has a unique address so that it can send and recive
              messages to other actors
            </p>
          </Notes>
        </ImageSlide>

        <ImageSlide image="sending-mail.gif" />

        <ImageSlide image="actor-model-mailbox.png">
          <Notes>
            <p>Taking a close look at the sending of messages</p>
            <p>we mentiomedd that each process has a unique addresss</p>
            <p>Messages are sent asynchorously and stored in the mailbox</p>
            <p>Actor recieves a message it can do one of 3 things</p>
            <p>create more actors</p>
            <p>send message to other actors</p>
            <p>
              designate what to do with the next message - or essentially update
              it's internal state which will be the staet used by the next
              message (essentially how actors mutate state
            </p>
          </Notes>
        </ImageSlide>

        <ListSlide
          inverted
          title="Proccesses"
          list={[
            'Are not OS processes',
            'Light weight',
            'Do not share memory',
            'Have a unique ID'
          ]}
        >
          <Notes />
        </ListSlide>

        <SimpleSlide
          fit={false}
          statement="The Actor Model is Physically based"
        />

        <ImageSlide image="switches.jpg">
          <Notes>
            <p>Built to model real world contraints of physical systems</p>
          </Notes>
        </ImageSlide>

        <ImageSlide image="telephone-lines.jpg">
          <Notes>
            <p>over long distances</p>
            <p>
              This maded a necessity some of the functionality available in our
              Elixir/Erlang Ecosystem
            </p>
          </Notes>
        </ImageSlide>

        <SimpleSlide inverted fit={false} statement="Distributed Elixir">
          <Notes>
            <p>
              Each process has a unique ID - making it really easy to
              commmunicate whether it be to a process on the same machine or
              across the world
            </p>
            <p>so processes communicate direclty with other processes</p>
            <p>
              And given that a node can go down at any time - we would not want
              sending a message normalize confiramtion of receiving a message ot
              be blocking - hence the asynchronous nature of the message passing
            </p>
            <p>messages are also not time bound in any sense</p>
          </Notes>
        </SimpleSlide>
        <SimpleSlide inverted fit={false} statement="Let it Crash">
          <Notes />
        </SimpleSlide>

        <ImageSlide inverted image="fault-tolerance.png">
          <Notes>
            <p>Erlang and Elixir allow for self healing systems</p>

            <p>
              Erlang and Elixir have specialized proecesses that monitor other
              processes
            </p>
            <p>
              back to coordination - if a part of our system breaks - we do not
              want to take down the whole system
            </p>
          </Notes>
        </ImageSlide>
        <ImageSlide inverted image="fault-tolerance-harry-potter.gif">
          <Notes>*</Notes>
        </ImageSlide>

        <SimpleSlide inverted fit={false} statement="The BEAM">
          <Notes />
        </SimpleSlide>

        <SimpleSlide inverted fit={false} statement="Preemptive scheduling">
          <Notes />
        </SimpleSlide>

        <ImageSlide inverted image="erlang-vm.jpg">
          <Notes>
            <p>
              Preemptive: A preemptive scheduler does context switching among
              running tasks and has the power to preempt (interrupt) tasks and
              resume them at a later time without the cooperation of the
              preempted task This is done based on some factors like their
              priority or reductions.
            </p>
            <p>
              The factor of selecting a process for execution is based on their
              priority level which is configurable per process and in each
              priority level processes are scheduled in a round robin fashion.
              On the other hand the factor of preempting a process from
              execution is based on a certain number of Reductions since the
              last time it was selected for execution, regardless of its
              priority level. The reduction is a counter per process that is
              normally incremented by one for each function call. It is used for
              preempting processes and context switching them when the counter
              of a process reaches the maximum number of reductions.
            </p>
          </Notes>
        </ImageSlide>

        <ListSlide
          inverted
          title="Elixir Priorities"
          list={['Scalable', 'Fault Tolerant (Telco Strong)', 'Fast']}
        >
          <Notes>
            <p>
              Elixir(Erlang) priorities help explain choices made in the
              language
            </p>
            <p>
              Elixir is designed to be easy to be scalable -- you can easily
              deal with increases in load on your system. All code runs in
              processes. Because each “process” does not take up a lot of
              processing power, hundreds of thousands of programs could be
              running at the same time potentially on different computers.
            </p>
            <p>
              When was the last time you dropped a phone call? -- Elixir(Erlang)
              introduces supervision which allows a process within your app to
              to crash without your whole app crashing
            </p>
            <p>
              Out of the box, erlang (and therefore Elixir) allows us to build
              applications to run in almost real time due to efficiency of the
              runtime.
            </p>
          </Notes>
        </ListSlide>

        <SimpleSlide statement="Go And CSP" />

        <DefinitionSlide
          inverted
          fit={false}
          term="CSP"
          definition="Communicating Sequential Processes"
        >
          <Notes>
            Go's concurrency model is based on something called CSP, or
            Communicating Sequential Processes, a system for describing
            coordinated work among independent processes first described by Tony
            Hoare in 1978
          </Notes>
        </DefinitionSlide>
        <ImageSlide
          inverted
          title="Process"
          image="sprinter.jpg"
          description="Smallest unit of work"
        >
          <Notes>
            So in the context of CSP, a Process just referest to the smallest
            possible indepedent unit of work.
            <br />
            Essentially something that has a start and an end.
            <br />I like to imagine a sprinter -- someone who goes from a
            defined start to a defined finish. <br />
          </Notes>
        </ImageSlide>
        <SimpleSlide inverted statement="CSP Process != OS Process">
          <Notes>
            As within the actor model, a process refers to something pretty
            small, a unit of work. And most implementations of CSP implement
            their version of a process on top of the OS, rather than relying on
            the operating system itself
          </Notes>
        </SimpleSlide>
        <ImageSlide
          inverted
          title="Channels"
          image="relayrace.jpg"
          description="Passing the baton"
        >
          <Notes>
            So if you have sprinters, small processes, how do you coordinate
            them? <br />
            Well lets imagine a relay race. The next sprinter waits till they
            get the baton <br />
            So you have processes, the sprinters, and they communicate, but they
            do it sequentially -- as in the messages they pass back and forth
            are sequentional in the sense that every read and write to a message
            channel can block the process
          </Notes>
        </ImageSlide>
        <SimpleSlide
          inverted
          fit={false}
          statement="Processes know channels, not other processes"
        >
          <Notes>
            One important difference from the traditional relay race is
            processes only know about channels. <br />
            So you can imagine the sprinter hands off the baton, but they don't
            know who they're going to hand off to -- <br />
            they just wait to hand off to the first person who's there
          </Notes>
        </SimpleSlide>

        <DefinitionSlide
          inverted
          term="Choice"
          definition="Processes choose behavior by listening on multiple channels"
        >
          <Notes>
            <p>
              A key additional element is that a process can at a given point,
              listen to multiple channels, and behave differently depending on
              which channel produces a message.
            </p>
            <p>
              So imagine a runner waiting for a baton, but they'll take a gold
              baton from one runner or a silver from another, whoever shows
              first. If they both show at once they choose a baton and random.
              And depending on whether they get the gold baton or the silver
              baton they run in a different direction
            </p>
          </Notes>
        </DefinitionSlide>
        <SimpleSlide statement="Looking at CSP in GO">
          <Notes>
            So let's look at how CSP actually works in practice, using Go as a
            concrete implementation
          </Notes>
        </SimpleSlide>
        <CodeSlide
          bgColor={colors.quartenary}
          notes={
            <div>
              <p>
                So this is a go program, and don't worry if you haven't seen go
                before, just suspend your disbelief.
                <br />
                Our goal here is to launch two processes, <br />
                have one send a message to a channel, <br />
                have another read from the channel
                <br />
                and then have them both notify the parent process that they're
                done
              </p>
              <p>
                This is our read function -- it takes a channel to read a string
                from, and a channel to notify the parent it's done. <br />
                Note that in go channels are typed, and we use an empty "struct"
                when we don't need to really transmit data but just want to say
                something happened
              </p>
              <p>
                Here's our write function, which you can see just writes to a
                channel and then notifies the parent its done
              </p>
              <p>And here's our main function</p>
              <p>
                Go is pretty low level, so we actually need to initialize our
                channels by telling go to allocate them. Go is garbage collected
                so we don't need to clean then up
              </p>
              <p>
                Here we kick of our read and write in parallel. Go's equivalent
                of CSP processes are called go routines. I'm gonna refer to them
                as go routines moving forward. <br />
                In go, any function becomes a go routine simply by putting the
                work go in front of it. So here we kick off the read and the
                write in parallel, and we've put the read before the write just
                to prove they're happening in parallel
              </p>
              <p>
                They both kick off, and then we read from our "done" channel
                twice to wait for both to complete. We don't technically have to
                do this, but if we didn't there's no gaurantee the finish
                statement would happen last.
              </p>
            </div>
          }
          lang="go"
          code={require('raw-loader!../assets/basicchannels.go')}
          ranges={[
            { loc: [0, 5], title: 'Channels in go!' },
            { loc: [4, 9], note: 'A function that reads from a channel' },
            { loc: [10, 14], note: 'A function that writes to a channel' },
            { loc: [15, 24], note: 'Main function' },
            { loc: [16, 18], note: 'Create the channels' },
            {
              loc: [18, 20],
              note: 'Start read and write operations in parallel'
            },
            { loc: [20, 23], note: 'Wait for both to complete' }
          ]}
        />
        <SimpleSlide
          fit={false}
          inverted
          statement="Synchronous Channels = Coordination"
        >
          <Notes>
            Every read and write to a channel is synchronous. If you write to a
            channel, it will block until someone else reads. The result of this,
            as you start to see in the example, is you can use channels to
            produce fairly predictable behavior, if that's what you want
          </Notes>
        </SimpleSlide>
        <CodeSlide
          bgColor={colors.quartenary}
          notes={
            <div>
              <p>
                Let's look at Go's implementation of choice, and why we might
                want to use it. Our scenario here is we're waiting for two
                parallel blocking operations -- say reading user input and
                waiting for a network request to complete.
              </p>
              <p>
                So here we have two channels representing input coming back from
                the user or the network
              </p>
              <p>
                Since this is a demo, we're not really gonna read from the
                network or from the user. So we'll make mock versions that just
                wait a random among of time and then return a value we specify
              </p>
              <p>
                Here's the function to generate a "delayed response" function.
              </p>
              <p>
                And now we kick off two go routines, with simulated response
                that will appear eventually, but we don't know when
              </p>
              <p>
                So let's figure out how to handle these responses. Here is a
                select statement, Go's implementation of choice. It looks like a
                switch, but in this case it runs whichever statement can be
                satisfied first. So when we get user input or we get a network
                response, we can respond to it.
              </p>
            </div>
          }
          lang="go"
          code={require('raw-loader!../assets/selectexample/selectexample.go')}
          ranges={[
            { loc: [0, 5], title: 'Choice in Go with select!' },
            {
              loc: [9, 11],
              note: 'Channels for user input and network responses'
            },
            { loc: [12, 14], note: 'Mock functions' },
            { loc: [26, 33], note: 'FYI: Generate a delayed function' },
            {
              loc: [14, 16],
              note: 'Kick off operations in parallel'
            },
            {
              loc: [16, 24],
              note: 'Read from both channels as soon as they are ready'
            }
          ]}
        />
        <SimpleSlide statement="How go implements CSP" />
        <QuoteSlide
          inverted
          quote="A goroutine is a lightweight thread managed by the Go runtime."
          cite="Official Tour Of Go"
        >
          <Notes>
            <p>Let's dig into what go routines are specifically.</p>
            <p>
              The go docs define a goroutine as a 'lightweight thread managed by
              the Go runtime.'
            </p>
            <p>
              The first word I see here is "thread", which is interesting cause
              CSP usually talks about processes
            </p>
            <p>And that's not by mistake cause...</p>
          </Notes>
        </QuoteSlide>
        <ImageSlide
          inverted
          title="Goroutines Share Memory"
          image="britney.gif"
          text="*stares Britnely*"
        />
        <SimpleSlide inverted statement="But wait there's more..." />
        <ConceptSlide
          inverted
          fit={false}
          concept="Sync Package"
          description="All the thread sync primitives, in Go!"
        />
        <QuoteSlide
          inverted
          cite="Go Docs"
          quote="Do not communicate by sharing memory; instead, share memory by communicating."
        />
        <QuoteSlide
          inverted
          textSize="3rem"
          cite="Also Go Docs"
          quote="This approach can be taken too far. Reference counts may be best done by putting a mutex around an integer variable, for instance. But as a high-level approach, using channels to control access makes it easier to write clear, correct programs."
        />
        <ConceptSlide
          inverted
          concept="Other Go Fun Fact"
          description="Go Routines Are Scheduled Cooperatively!"
        >
          <Notes>
            One more fun fact about Go -- Go Routines have to explicitly or
            implicitly give up control in order for another go routine to get
            scheduled. It's not like erlang where the scheduler allocates work
            for a process and then forcibly takes away control automatically.
            This can lead to some confusing locking behavior in certain rare
            cases.
          </Notes>
        </ConceptSlide>
        <ImageSlide inverted title="WTF GO?" image="blinkingwhiteguy.gif">
          <Notes>
            All of this may be leading you to wonder what the heck is going on
            with Go. So before we get all judgey, let's look at a few other
            aspects of Go's implementation that might help us get a fuller
            picture of the rationale for Go's decisions
          </Notes>
        </ImageSlide>
        <SimpleSlide inverted statement="Go compiles to native code" />
        <SimpleSlide inverted statement="Go run-time is small (2MB)" />
        <SimpleSlide
          inverted
          statement="Go is (almost) a systems programming language"
        >
          <Notes>
            And this gets to the core design goal of Go. Go is designed to be a
            replacement in many cases for C. It is garbage collected, so you
            wouldn't neccesarily write your operating system in Go, but it's
            designed to cover most of the other applications you'd write a
            program in C with. But it's also flexible and easy enough to work
            with that you can write a web server with it.
          </Notes>
        </SimpleSlide>
        <ListSlide
          inverted
          title="Go Priorities"
          list={['Ease of adoption', 'Speed', 'Flexibility']}
        >
          <Notes>
            <p>
              Once you understand Go's priorities, you can figure out why a lot
              of decisions were made.
            </p>
            <p>
              Go is designed to be easy to adopt -- you can learn the basic
              syntax and concepts quickly. It's a pretty flexible language with
              not a ton of convention.
            </p>
            <p>
              It's small and fast -- go includes almost none of the higher level
              concurrency primitives that Erlang has -- Supervisors, GenServers,
              etc
            </p>
            <p>
              And as a result it's flexible and can be adapted to a wide variety
              of use cases, with the caveat that you might need to bring some
              extra libraries to the table if you need higher level conventions
            </p>
          </Notes>
        </ListSlide>
        <SimpleSlide statement="CSP vs Actor Model">
          <Notes>
            So now we're gonna look at these different concurrency models-- the
            Actor Model and CSP-- how they are similar and different and show
            you how you can bring some of the gaps between them.
          </Notes>
        </SimpleSlide>
        <ListSlide
          inverted
          title="CSP and Actor model Similarities"
          list={[
            "Abstract 'processes' managed by runtime",
            'Share data by communicating/message passing'
          ]}
        >
          <Notes>
            <p>
              First of all it needs to be said how much more similar these
              models are than they are different, at least when compared to
              traditional threaded programming.
            </p>

            <p>
              Both go and Elixir manage their own concurrent code -- they both
              have an abstract concept of an executing piece of code apart from
              the operating system, and this means you don't have to spend a lot
              of time thinking about scheduling those pieces of code to run. Or
              worry a whole lot about the memory implications of spinning up
              thousands of Elixir processes or Go Routines
            </p>
            <p>
              And moreover, while Go is certainly less rigid in it's
              implementation, both CSP and the Actor Model emphasize message
              passing -- sharing data by communicating -- as the basic primitive
              for synchronization. And honestly, in my humble opinion, message
              passing is just better.
            </p>
          </Notes>
        </ListSlide>
        <QuoteSlide
          inverted
          quote="Erlang's syntax derived from Prolog and was heavily influenced by smalltalk, CSP and the functional programming."
          cite="Joe Armstrong, Erlang Creator"
        >
          <Notes>
            And none of this is a coincidence. While the Actor Model is it's own
            theoretical concept, Joe Armstrong himself says that Erlang was
            heavily influenced by CSP
          </Notes>
        </QuoteSlide>
        <ConceptSlide
          inverted
          fit={false}
          concept="Difference #1"
          description="Process Identity"
        >
          <Notes>
            <p>But there are some differences</p>
            <p>
              The first key difference is identity. Actor Model processes have
              identities -- in Erlang you get a process id and you can refer to
              it directly
            </p>
            <p>
              CSP processes are largely anonymous. Once you create a go routine
              there's no direct way to refer to it
            </p>
          </Notes>
        </ConceptSlide>
        <ConceptSlide
          inverted
          fit={false}
          concept="Difference #2"
          description="Direct communication vs channels"
        >
          <Notes>
            <p>
              Because CSP processes are anonymous, they don't communicate
              directly
            </p>
            <p>
              And this is the second big difference -- if I want to communicate
              with an actor process, I send it a message
            </p>
            <p>
              In CSP on the other hand I communicate with channels, and they get
              read by whatever process is listening
            </p>
            <p>So there's a layer of indirection</p>
          </Notes>
        </ConceptSlide>
        <ConceptSlide
          inverted
          fit={false}
          concept="Difference #3"
          description="Asynchronous vs synchronous message passing"
        >
          <Notes>
            <p>
              Finally, CSP messages are synchronous-- they get read immediately.
              That's really different than the actor model where messages are
              completely asynchronous
            </p>
            <p>
              This really changes how you work with them, and it does mean CSP
              is less well suited to distributed systems -- you just can't have
              synchronous messages across a network.
            </p>
          </Notes>
        </ConceptSlide>
        <ImageSlide
          inverted
          title="No So Different After All?"
          image="tomato.jpg"
        >
          <Notes>But are these really substantive differences?</Notes>
        </ImageSlide>

        <ListSlide
          inverted
          ordered={false}
          title="How To Give CSP Process An Identity"
          list={[
            '1 CSP channel',
            '+ 1 CSP Process Reading From Channel',
            '= Channel Becomes De-facto Identity'
          ]}
        />
        <ListSlide
          inverted
          ordered={false}
          title="How To Pass CSP Messages Asynchronously"
          list={[
            'Message Queue Process',
            '+ Channel For Sending',
            '+ Channel For Receiving',
            '= Asynchronous Message Passing'
          ]}
        />

        <DefinitionSlide
          inverted
          term="Building An Unbounded Channel In Go"
          definition="https://medium.com/capital-one-tech/building-an-unbounded-channel-in-go-789e175cd2cd"
        />
        <CodeSlide
          bgColor={colors.quartenary}
          notes={
            <div>
              <p>
                So this is a real pattern I use to simulate genservers in Go.
                The things I like about gen servers are the isolation of state,
                the ability to send messages to genservers and get a response,
                the ability to pattern match on messages to generate a response,
                and in Elixir, the nice apis you can build for their clients
              </p>
              <p>
                We're gonna make a mock genserver that implements a counter we
                increment, decrement, and read the value of
              </p>
              <p>message interface</p>
              <p>
                Here's we a function to build this counter and start it off.
                Note it'll take a signal to kill the counter
              </p>
              <p>
                Go offer's buffered channels, which provide a mechanism for
                semi-non-blocking use
              </p>
              <p>Our API - increment</p>
              <p>Decrement</p>
              <p>Get value</p>
              <p>The loop</p>
              <p>Response to termination</p>
              <p>Process a message</p>
              <p>Message handlers</p>
            </div>
          }
          lang="go"
          code={require('raw-loader!../assets/genserver.go')}
          ranges={[
            { loc: [0, 5], title: 'A GenServer in Go!' },
            {
              loc: [6, 12],
              note: 'Defining a counter type'
            },
            {
              loc: [2, 5],
              note: 'Defining a message interface'
            },
            { loc: [13, 22], note: 'New function' },
            { loc: [16, 17], note: 'Buffered Channel ~= Asynchronous' },
            { loc: [19, 20], note: 'Fire up process' },
            { loc: [23, 28], note: 'Send Increment Command' },
            { loc: [29, 34], note: 'Send Decrement Command' },
            { loc: [39, 44], note: 'Get current value command' },
            { loc: [45, 55], note: 'Run loop' },
            { loc: [56, 67], note: 'Message handlers' }
          ]}
        />

        <DefinitionSlide
          inverted
          term="How do we implement channels in Elixir?"
        />

        <CodeSlide
          bgColor={colors.quartenary}
          notes={<div />}
          lang="elixir"
          code={require('raw-loader!../assets/channels.ex')}
          ranges={[
            { loc: [0, 5], title: 'Channels in Elixir' },
            {
              loc: [0, 8],
              note: 'Defining a queue'
            },
            {
              loc: [9, 16],
              note: 'Adding to queue'
            },
            { loc: [15, 18], note: 'return if buffered' },
            { loc: [18, 22], note: 'Else Return value' },
            { loc: [23, 27], note: 'Take from Queue' },
            { loc: [25, 28], note: 'return if empty' },
            { loc: [28, 32], note: 'Else return new queue' },
            { loc: [36, 45], note: 'Create GenServer' },
            { loc: [46, 50], note: 'Initialize Channel' },
            { loc: [52, 57], note: 'Buffered channel' },
            { loc: [59, 62], note: 'blocking response if no value' },
            { loc: [63, 65], note: 'return updated queue' },
            { loc: [67, 73], note: 'block if queue full' },
            { loc: [72, 76], note: 'return when queue updated' }
          ]}
        />

        <SimpleSlide statement="Conclusions" />
        <ConceptSlide
          inverted
          fit={false}
          concept="Lesson"
          description="Don't be limited by your language"
        />
        <SimpleSlide
          inverted
          fit={false}
          statement="We don't always choose our language."
        />

        <SimpleSlide
          inverted
          fit={false}
          statement="Choice of lanuage is one of many decisions we must make"
        />
        <ImageSlide
          title="Thank you!"
          image="poohbear.jpg"
          text="http://concurrency.techgirlwonder.com"
        >
          <Notes>Need to replace this image</Notes>
        </ImageSlide>
      </Deck>
    )
  }
}
