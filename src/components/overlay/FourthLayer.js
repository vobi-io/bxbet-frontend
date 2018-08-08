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
  font-size: 14px;
  font-weight: bold;
`
const Text = styled.p`
  color: #004D80;
  font-size: 14px;
  word-break: break-word;
  margin: 0px;
  margin-top: ${props => (props.lg ? '30px' : '10px')};
`
const Link = styled.a`
  color: #004D80;
  text-decoration: underline;
  margin-top: 10px;
  font-size: 14px;
`
const Button = styled.button`
  font-size: 16px;
  font-weight: 600;
  border: none;
  margin-top: 20px;
  background: #37d697;
  padding: 12px 40px;
  border-radius: 8px;
  color: #ffffff;
  cursor: pointer;
`


const FourthLayer = ({ closeOverlay }) => (
  <Container>
    <Title>How does it work?</Title>
    <Text lg>
      Our MVP offers full blockchain based betting and implements the functionality of a betting exchange.
    </Text>
    <Text>
      You can use your initial stake of BX tokens to place buy or sell orders on the
      outcome of a betting market. To place an order you can either:
    </Text>
    <Text>
      Click on one of the available offers in the „available offers“ tab and then adjust your order in the bet slip,
      then place the bet
    </Text>
    <Text>
      Directly set the „Outcome“, your „Odds“ and the „Stake“ in the bet slip
    </Text>
    <Text>
      For a more detailed explanation on the functionality of a betting exchange,
      especially the differences between BUY and SELL orders, please visit
    </Text>
    <Link href="https://bx.bet/en/exchange/">BX.bet/exchange.</Link>
    <Text>
      After the event takes place, the market will be automatically resolved and the Smart Contract will distribute
      all winnings
    </Text>
    <Button onClick={() => closeOverlay()} >Accept and start</Button>
  </Container>
)

export default FourthLayer
