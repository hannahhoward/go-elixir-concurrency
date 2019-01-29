// Import React
import React from 'react'

// Import Spectacle Core tags
import { Heading, Appear, Image, Text } from 'spectacle'
import styled from 'styled-components'

import asSlide from './as-slide.jsx'
import FullScreen from './full-screen.jsx'

const imageStyle = {
  zoom: 8, //increase if you have very small images
  display: 'block',
  margin: 'auto',
  height: 'auto',
  width: 'auto',
  maxWidth: '100%',
  maxHeight: '90%',
  marginTop: '5%'
}

const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  flex-basis: 33%;
  justify-content: space-evenly;
`

const AboutMeSlide = ({ children }) => {
  const tgwLogo = require('../../assets/images/techgirlwonder-01.png').replace(
    '/',
    ''
  )
  const c5Logo = require('../../assets/images/c5_final_logo_only_hires.png').replace(
    '/',
    ''
  )
  const annaLogo = require('../../assets/images/anna-headshot.jpg').replace(
    '/',
    ''
  )
  return (
    <FullScreen column>
      <Row style={{ flexShrink: 0 }}>
        <Heading size={1} fit caps lineHeight={1} textColor="quartenary">
          Hannah + Anna #AboutUs
        </Heading>
      </Row>
      <Row>
        <Appear order={0}>
          <Column>
            <Image src={annaLogo} style={imageStyle} />
            <Text>
              Anna Neyzberg
              <br />
              @Aneyzb
              <br />
              she/her
            </Text>
          </Column>
        </Appear>

        <Appear order={1}>
          <Column>
            <Image src={tgwLogo} style={imageStyle} />
            <Text>
              Hannah Howard
              <br />
              @techgirlwonder
              <br />
              she/her
            </Text>
          </Column>
        </Appear>
        <Appear order={2}>
          <Column>
            <Image src={c5Logo} style={imageStyle} />
            <Text style={{ wordBreak: 'break-word' }}>
              anna@carbonfive.com
              <br />
              hannah@carbonfive.com
            </Text>
          </Column>
        </Appear>
      </Row>
      {children}
    </FullScreen>
  )
}

export default asSlide(AboutMeSlide)
