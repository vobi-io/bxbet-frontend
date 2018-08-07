import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Montserrat;
  align-items: center;
  text-align: center;
`
const Title = styled.span`
  color: #004D80;
  font-size: ${props => (props.fontSize ? props.fontSize : '14')}px;
  font-weight: bold;
  margin-top: ${props => (props.marginTop ? props.marginTop : null)}px;
`
const Text = styled.p`
  color: #004D80;
  font-size: 14px;
  word-break: break-word;
  margin: 0px;
`
const FlexRow = styled.div`
  display: flex;
  margin-top: 30px;
`

const ThirdLayer = () => (
  <Container>
    <Title fontSize={16}>How to start?</Title>
    <Title marginTop={25}>Register</Title>
    <Text>Please use the „Sign up“ Button to register for the usage of the MVP.</Text>
    <Title marginTop={25}>Login</Title>
    <Text>After you registered, you can login.</Text>
    <Title marginTop={25}>Receive your initial BX Tokens</Title>
    <Text>
      You will see that you have an initial stake of 20.000 BX Tokens in your account
      now.
    </Text>
    <FlexRow>
      <Title>NOTE:</Title>
      <Text>
        This is a dummy BX currency and not the one you can buy in our token
        sale
      </Text>
    </FlexRow>
  </Container>
)

export default ThirdLayer
