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
            <p>
              This is just the introductory slide I use, we can remake for our
              own purposes.
            </p>
            <p>
              Note for all slides you can use a notes tag in children to
              specific presenter notes, and those notes support HTML
            </p>
          </Notes>
        </AboutMeSlide>
        <ConceptSlide
          fit={false}
          inverted
          concept="Key Question"
          description="How do we coordinate between parallel programs?"
        />
        <ImageSlide
          fit={false}
          inverted
          title="The Problem"
          image="double-keyboard.gif"
          text="Concurrency Without Coordination"
        />
        <ListSlide
          ordered={false}
          inverted
          title="Threads coordinate by sharing data"
          list={[
            'Use same memory space',
            'Use mutation on shared state to communicate',
            'Use various locks to prevent overwriting each others work'
          ]}
        />
        <ImageSlide
          fit={false}
          inverted
          title="Threads"
          image="Rundmc.jpg"
          text="Old School Concurrency"
        />
        <SimpleSlide
          fit={false}
          inverted
          statement="Most widely used programming languages support threads."
        />
        <ImageSlide
          fit={false}
          inverted
          title="Mo Threads"
          image="biggie.jpg"
          text="Mo Problems"
        />
        <ListSlide
          inverted
          title="Challenges With Threads"
          list={[
            'Lots of shared mutable state',
            'Dead locks / unpredictabiity',
            'Expontential complexity to manage'
          ]}
        />
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
            their version of a process on top of the OS
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
                before, just suspend your disbelief. Our goal here is to launch
                to processes, have one send a message to a channel, have another
                read from the channel and then have them both notify the parent
                process that they're done
              </p>
              <p>
                So here we see our read function -- it takes a channel to read a
                string from, and a channel to notify the parent it's done. Note
                that in go channels are typed, and we use an empty "struct" when
                we don't need to really transmit data but just want to say
                something happened
              </p>
              <p>
                Here's our write function, which you can see just writes to a
                channel and then notifies the parent its done
              </p>
              <p>So here's our main function</p>
              <p>
                Go is pretty low level, so we actually need to initialize our
                channels by telling go to allocate them. Though it is garbage
                collected so we don't need to clean up
              </p>
              <p>
                So here's where we kick of our read and write in parallel. Go's
                equivalent of CSP processes are called go routines. I'm gonna
                refer to them as go routines moving forward cause they are some
                important differences with most definitions of a process in most
                languages I'll explain in a second. In go, any function becomes
                a go routine simply by putting the work go in front of it. So
                here we kick off the read and the write in parallel, and we've
                put the read before the write just to prove they're happening in
                parallel
              </p>
              <p>
                So they both kick off, and then we read from our "done" channel
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
            So a key thing to note here is every read and write to a channel is
            synchronous. If you write to a channel, it will block until someone
            else reads. So you can use channels to produce fairly predictable
            behavior, if that's what you want
          </Notes>
        </SimpleSlide>
        <CodeSlide
          bgColor={colors.quartenary}
          notes={
            <div>
              <p>
                Let's look at choice in CSP, using go's implementation of choice
                via the select statement.
              </p>
              <p>
                So first we have a function that waits a given amount of time,
                and then notifies that it's done.
              </p>
              <p>
                And here's our new main function, which will launch two
                goroutines that sleep a random amount of time, and then it will
                print which one finished first and which second, but importantly
                won't take longer than the longer routine.
              </p>
              <p>
                So here are our two channels, just notifications that pass no
                data
              </p>
              <p>
                And now we kick off two go routines, that will each take a
                random amount of time to complete.
              </p>
              <p>
                So we want to print when each one finishes, but we don't know
                which will be first, and we don't want to block by reading from
                the wrong channel. So Here is a select statement. It looks like
                a switch, but in this case it runs whichever statement can be
                satisfied first. And we loop two times so we read from both
                channels. One important thing to note -- if we'd had both go
                routines complete at the same time, so that both channels had a
                value, the select becomes non-deterministic -- there is no way
                to know which case will run.
              </p>
            </div>
          }
          lang="go"
          code={require('raw-loader!../assets/selectexample.go')}
          ranges={[
            { loc: [0, 5], title: 'Choice in Go with select!' },
            {
              loc: [8, 12],
              note: 'A function that waits a given duration then notifies'
            },
            { loc: [13, 29], note: 'Main function' },
            { loc: [14, 16], note: 'Create the channels' },
            {
              loc: [16, 20],
              note: 'Sleep random time on each channel'
            },
            {
              loc: [20, 28],
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
        <ImageSlide title="WTF GO?" image="blinkingwhiteguy.gif">
          <Notes>
            All of this may be leading you to wonder what the heck is going on
            with Go. So before we get all judgey, let's look at a few other
            aspects of Go's implementation that might help us get a fuller
            picture of the rationale for Go's decisions
          </Notes>
        </ImageSlide>
        <SimpleSlide statement="Go compiles to native code" />
        <SimpleSlide statement="Go run-time is small (2MB)" />
        <SimpleSlide statement="Go is (almost) a systems programming language">
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
        <ImageSlide title="No So Different After All?" image="tomato.jpg">
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
          notes={<div />}
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
            { loc: [48, 50], note: 'Check for termination' },
            { loc: [50, 52], note: 'Handle a message' },
            { loc: [56, 67], note: 'Message handlers' }
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
