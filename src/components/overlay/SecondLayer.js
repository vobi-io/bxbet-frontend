import React from 'react'
import styled from 'styled-components'

import Telegram from '../../resources/assets/Telegram.png'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Montserrat;
  align-items: center;
  text-align: center;
`
const Title = styled.span`
  color: #004D80;
  font-size: 14px;
  font-weight: bold;
`
const Text = styled.p`
  color: #004D80;
  font-size: 14px;
  word-break: break-word;
  margin-top: 30px;
`
const SocialIcon = styled.img`
  width: 60px;
  position: absolute;
  left: -31px;
  top: -15px;
`
const Join = styled.div`
  font-size: 14px;
  font-weight: bold;
  height: 25px;
  width: 120px;
  text-align: right;
  padding-right: 5px;
  padding-top: 5px;
  background-image: linear-gradient(to bottom, #1C70A8, #255179 99%);
  border-radius: 7px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.8);
  color: #ffffff;
`

const LinkDiv = styled.a`
  position: relative;
  margin-top: 100px;
  cursor: pointer;
  text-decoration: none;
`
const SecondLayer = () => (
  <Container>
    <Title>How can I participate in the token sale?</Title>
    <Text>
      Please visit our main page and register for the token sale. This is a
      different account than the one, you are using for the MVP.
    </Text>
    <Text>Please visit our main website to register for the token sale.<a href="www.bx.bet">www.bx.bet</a></Text>
    <Text>If you have additional questions, please join our telegram group.</Text>
    <LinkDiv href="https://t.me/bxbet" target="_blank">
      <SocialIcon src={Telegram} alt="telegram" />
      <Join>JOIN NOW</Join>
    </LinkDiv>
  </Container>
)

export default SecondLayer
