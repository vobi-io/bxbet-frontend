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
  margin-top: 30px;
`
const Span = styled.span`
  color: #004D80;
  font-size: 14px;
  margin-top: 100px;
`
const Link = styled.a`
  color: #004D80;
  text-decoration: underline;
`

const FirstLayer = () => (
  <Container>
    <Title>{"What's BX?"}</Title>
    <Text>
      BX is a blockchain-based betting and prediction market ecosystem, designed to
      change the way the world bets. BX has the vision to create a whole new betting
      experience, where any user can take over the role of the bookmaker, create their
      own markets, place and offer bets with self-determined odds, and even
      participate in the outcome determination of a market. All by using the BX Token,
      which is conceived to become the global standard for all betting transactions.
    </Text>
    <Span>For more information please visit: <Link href="https://bx.bet" target="_blank">https://bx.bet</Link></Span>
  </Container>
)


export default FirstLayer
