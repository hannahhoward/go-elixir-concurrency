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
import aboutMeSlideAnna from './slideTemplates/about-me-slide-anna.jsx';

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
        <AboutMeSlideAnna ></AboutMeSlideAnna>


{/*
        <ImageSlide
          title="Pooh Beard"
          image="poohbear.jpg"
          text="Here is my dog"
        >
          <Notes>
            Image slide displays an image with a heading above and regular size
            text below <br />
            Images should live in assets/images to be picked up here
          </Notes>
        </ImageSlide> */}
        <DefinitionSlide
          fit={false}
          term="Concurrency"
          definition="Go vs. Elixir"
        >
          <Notes>
            Definition slides have a large heading and small, longer text below,
            usually used to define term.
            <br />
            fit=false specifies if the heading gets scaled and stretched to fit
            on a single line
          </Notes>
        </DefinitionSlide>
        <ImageSlide
          image="go-vs-elixir.jpg"
        >
          <Notes>
            And when we are looking Go vs Elixir what we are really looking at today are the concurrency models of the the two. And we are not really talking about
            one versus the other. We really are looking at the right tool for the right job. In this case we are comparing. The actor model vs
            Communicating Sequential Processes. But before we talk about that - let's take a look at how we might define concurrency
          </Notes>
        </ImageSlide>
        <SimpleSlide
          inverted
          fit={false}
          statement="Where did this start?"
        >
          <Notes>
            <p>Simple slide is just a one line statement at heading size</p>
            <p>
              <b>Note the `inverted` attribute</b>
            </p>
            <p>
              Inverted on any slide uses the dark color palette version -- I
              usually use it once I'm in the main content of the talk
            </p>
          </Notes>
        </SimpleSlide>

        <ImageSlide
          image="single-threaded.png"
        >
          <Notes>
            In the beginning, computers did not have operating systems and were
            designed to execute a single program from beginning to end —
            each program had access to all of the machine’s resources.
          </Notes>
        </ImageSlide>
        <ImageSlide
          image="multi-threaded.png"
        >
          <Notes>
          Over time, operating systems evolved to
          allow multiple programs to execute at once,
          each within a process — an independently isolated program that
          is assigned resources like memory, file handles, and security controls. 
          </Notes>
        </ImageSlide>
        <ImageSlide
          image="concurrency-explained.jpg"
        >
          <Notes>
            the ability of different parts or units of a program,
           algorithm, or problem to be executed out-of-order or in partial order,
            without affecting the final outcome.
            - * Concurrency: Concurrency is the scheduling of work to happen over multiple processors (or multiple nodes in a system).
            Concurrency implies that each unit of work is continuously making progress.
            - * Parallelism: Parallelism happens when at least two units of work are executing simultaneously. It’s notable that you can support concurrency on a
            single processor system using appropriate scheduling, while parallelism requires multiple processors or systems.
          </Notes>
        </ImageSlide>
        <SimpleSlide
          inverted
          fit={false}
          statement="Let's break that down"
        >
          <Notes>
          </Notes>
        </SimpleSlide>
        <ImageSlide
          image="os-processes.jpg"
        >
          <Notes>
          </Notes>
        </ImageSlide>
        <SimpleSlide
          inverted
          fit={false}
          statement="An executing instance of a program is called a process"
        >
          <Notes>
          </Notes>
        </SimpleSlide>
        <SimpleSlide
          inverted
          fit={false}
          statement="A process is always stored in the main memory"
        >
          <Notes>
          </Notes>
        </SimpleSlide>
        <SimpleSlide
          inverted
          fit={false}
          statement="On a multiprocessor system, multiple processes can be executed in parallel"
        >
          <Notes>
          </Notes>
        </SimpleSlide>

        <ImageSlide
          image="calculator.gif"
        >
          <Notes>
            - * Example: Executing multiple instances of the ‘Calculator’ program. Each of the instances are termed as a process.
          </Notes>
        </ImageSlide>

        <SimpleSlide
          inverted
          fit={false}
          statement="Ok, so what is a thread?"
        >
          <Notes>
          </Notes>
        </SimpleSlide>

        <ImageSlide
          image="threads.png"
        >
          <Notes>
            * A thread is a subset of the process.
            * It is termed as a ‘lightweight process’, since it is similar to a real
            process but executes within the context of a process and shares the same resources allotted to the process by the kernel.
          </Notes>
        </ImageSlide>

        <SimpleSlide
          inverted
          fit={false}
          statement="A thread is a subset of the process"
        >
          <Notes>
          </Notes>
        </SimpleSlide>
        <SimpleSlide
          inverted
          fit={false}
          statement="share the same address space, file descriptors, stack and other process related attributes"
        >
          <Notes>
          </Notes>
        </SimpleSlide>
        <SimpleSlide
          inverted
          fit={false}
          statement="threads of a process share the same memory"
        >
          <Notes>
          </Notes>
        </SimpleSlide>

        <SimpleSlide
          inverted
          fit={false}
          statement="Concurrency: scheduling of work to happen over multiple processors"
        >
          <Notes>
          </Notes>
        </SimpleSlide>
        <SimpleSlide
          inverted
          fit={false}
          statement="Concurrency:  implies that each unit of work is continuously making progress."
        >
          <Notes>
          </Notes>
        </SimpleSlide>
        <SimpleSlide
          inverted
          fit={false}
          statement="Process: A process is an instance of a computer program that is being executed"
        >
          <Notes>
          </Notes>
        </SimpleSlide>
        <SimpleSlide
          inverted
          fit={false}
          statement="Thread: Subset of a process that and shares memory"
        >
          <Notes>
          </Notes>
        </SimpleSlide>
        <ConceptSlide
          description="So why do we care about concurrency?"
        >
          <Notes>
          * Concurrency provides a natural method for composing asynchronous code.
            concept is normal text while the description is header text below
          </Notes>
        </ConceptSlide>
        <ImageSlide
          image="asynchronous.gif"
        >
          <Notes>
            * Concurrency provides a natural method for composing asynchronous code.
            * Concurrency allows your program to avoid blocking user operations.
            * Concurrency provides one of the easiest ways take advantage of multi core systems..
          </Notes>
        </ImageSlide>


        <QuoteSlide
          quote="“Make it work, then make it beautiful, then if you really, really have to, make it fast.
          90 percent of the time, if you make it beautiful, it will already be fast. So really, just make it beautiful!”"
          cite="Joe Armstrong"
        >
          <Notes>Who is familiar with Joe Armstrong</Notes>
        </QuoteSlide>
        <SimpleSlide
          inverted
          fit={false}
          statement="The Actor Model"
        >
          <Notes>
          </Notes>
        </SimpleSlide>

        <ImageSlide
          image="actor-model-mailbox.gif"
        >
          <Notes>
            * The actor model is a conceptual model to deal with concurrent computation
            * It defines some general rules for how the system’s components should behave and interact with each other.
          </Notes>
        </ImageSlide>

        <ImageSlide
          image="actor-model-mailbox.gif"
        >
          <Notes>
            * An actor is the primitive unit of computation.
            * It’s the thing that receives a message and do some kind of computation based on it.
          </Notes>
        </ImageSlide>

        <ImageSlide
          image="process.jpg"
        >
          <Notes>
            * In elixir this Actor unit is the process
            * It receives a message, does some computation adn can maintain state
            * actors are completely isolated from each other and they will never share memory
            * It’s also worth noting that an actor can maintain a private state that can never be changed directly by another actor.
          </Notes>
        </ImageSlide>

        <ImageSlide
          image="messages-2.jpg"
        >
          <Notes>
            * In the actor model everything is an actor and they need to have addresses so one actor can send a message to another.
            * multiple actors can run at the same time, an actor will process a given message sequentially.
            * 3 messages being executed concurrently, you need to create 3 actors and send one message to each.
            * Messages are sent asynchronously to an actor, that needs to store them somewhere while it’s processing another message. The mailbox is the place where these messages are stored.
          </Notes>
        </ImageSlide>

        <ImageSlide
          image="messages-3.jpg"
        >
          <Notes>
            When an actor receives a message, it can do one of these 3 things:
              * Create more actors
              * Send messages to other actors
              * Designate what to do with the next message
          </Notes>
        </ImageSlide>

        <SimpleSlide
          inverted
          fit={false}
          statement="Let it Crash"
        >
          <Notes>
          </Notes>
        </SimpleSlide>

        <ImageSlide
          image="fault-tolerance.png"
        >
          <Notes>
              * fault tolerance
          </Notes>
        </ImageSlide>

        <ImageSlide
          image="fault-tolerance.png"
        >
          <Notes>
              * Each process is a unit and does not share memory
              * Specialized processes whose only job is to supervices other process -
              * and know how to spin child processes up when they die
          </Notes>
        </ImageSlide>
         <ImageSlide
          image="fault-tolerance-harry-potter.gif"
        >
          <Notes>
              *
          </Notes>
        </ImageSlide>


        <ImageSlide
          image="fault-tolerance.png"
        >
          <Notes>
              * Build self-healing systems
          </Notes>
        </ImageSlide>



        <SimpleSlide
          inverted
          fit={false}
          statement="Distributed Elixir"
        >
          <Notes>
          </Notes>
        </SimpleSlide>

        <ImageSlide
          image="messages-3.jpg"
        >
          <Notes>
            * Another interesting aspect of the actor model is that it doesn’t matter if the actor that I’m sending a message to is running locally or in another node
            *  if an actor is just this unit of code with a mailbox and an internal state, and it just respond to messages, who cares in which machine it’s actually running?
             As long as we can make the message get there we are fine.
            * This allows us to create systems that leverage multiple computers and helps us to recover if one of them fail.
          </Notes>
        </ImageSlide>

        









        <QuoteSlide
          quote="Fourscore and seven years ago"
          cite="Abraham Lincoln"
        >
          <Notes>Quote slide is for quotations with an attribution</Notes>
        </QuoteSlide>
        <ConceptSlide
          concept="Question 1"
          description="What is the meaning of life?"
        >
          <Notes>
            Concept slides are just the opposite of definition slides -- the
            concept is normal text while the description is header text below
          </Notes>
        </ConceptSlide>
        <CodeSlide
          notes={
            <div>
              <p>
                Code slides are for displaying code snippets, with a cool
                animated, if somewhat finicky library
              </p>
            </div>
          }
          lang="c"
          code={require('raw-loader!../assets/interrupt.c')}
          ranges={[
            { loc: [0, 5], title: 'In The Beginning... C!' },
            { loc: [20, 28], note: 'Override the damn BIOS!' },
            { loc: [10, 19], note: 'Interrupt Service Request Code' },
            { loc: [35, 50], note: 'The main loop' },
            { loc: [44, 47], note: 'Read from the buffer and update state!' },
            { loc: [50, 58], note: 'Ctrl+C will not save you...' }
          ]}
        />
        <ListSlide
          ordered={false}
          title="Observer Pattern vs Global Event Bus"
          list={[
            '(+) Way simpler than global event bus',
            '(+) Localized scope',
            '(-) Have To Setup Subscriptions'
          ]}
        >
          <Notes>
            <p>
              List slides are just an easy way to display an ordered or
              unordered list, without all the business of ul/li tags
            </p>
          </Notes>
        </ListSlide>
      </Deck>
    )
  }
}
