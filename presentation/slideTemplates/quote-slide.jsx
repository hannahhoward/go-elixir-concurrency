// Import React
import React from 'react'
import PropTypes from 'prop-types'

// Import Spectacle Core tags
import { BlockQuote, Quote, Cite } from 'spectacle'

import asSlide from './as-slide.jsx'
import { headingColor, textColor } from './utilities.jsx'
import FullScreen from './full-screen.jsx'

const QuoteSlide = ({ textSize, inverted, quote, cite, children }) => {
  return (
    <FullScreen column>
      <BlockQuote style={{ textAlign: 'right' }}>
        <Quote textSize={textSize} textColor={headingColor(inverted)}>
          {quote}
        </Quote>
        <Cite textColor={textColor(inverted)}>{cite}</Cite>
      </BlockQuote>
      {children}
    </FullScreen>
  )
}

QuoteSlide.propTypes = {
  cite: PropTypes.string.isRequired,
  inverted: PropTypes.bool,
  textSize: PropTypes.string,
  quote: PropTypes.string.isRequired
}

QuoteSlide.defaultProps = {
  inverted: false
}

export default asSlide(QuoteSlide)
