import React from 'react'
import styled from 'styled-components'
import BuyIcon from '../availableOdds/BuyIcon'
import SellIcon from '../availableOdds/SellIcon'
import ChooseOutcome from '../chooseOutcome'

import enhance from './orderBookEnhance'

const Container = styled.div`
  width: 100%;
  height: 478px;
  font-family: Montserrat;
  font-size: 14px;
  color: white;
  overflow: hidden;
  background-color: #091f2d;
`

const StyledContent = styled.div`

& .rows {
  display: flex;
  border-bottom: solid 1px #4b5963;
  align-items: center;
  height: 39px;

  & .odds {
    width: 100%;
    text-align: left;
    color: ${p => (p.title === 'buy' ? '#37d697' : '#f01150')};
    font-size: 14px;
    font-weight: bold;
  }
  & .amount {
    width: 100%;
    text-align: right;
    color: ${p => (p.title === 'buy' ? '#37d697' : '#f01150')};
    font-size: 14px;
    color: #ffffff;
  }
}
`

const Line = styled.div`
height: 40px;
width: 2px;
background-color: #92acfe;
`

const StyledTables = styled.div`
  display: flex;
  justify-content: center;
  margin: 11px;
`
const Brick = styled.div`
      width: 2%;
    `
const ComponentContainer = styled.div`
  min-width: 50.566%;
  background-color: #122d3e;
  margin-right: 11px;
  font-family: Montserrat;
  @media only screen and (max-width: 1024px) {
    margin-bottom: 10px;
  }
`
const TitleContainer = styled.div`
  min-width: 40%;
  display: flex;
  flex-direction: column;
  margin-left: 15px
  margin-top: 20px;
  margin-bottom: 18px;
`
const Title = styled.div`
  margin-bottom: 12px;
  color: #ffffff;
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 500;
`
const SubTitle = styled.span`
  font-size: 10px;
  color: #6e7e8a;
`
const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
`

const OrderBook = ({ ...props }) => {
  let selectedOutcome
  if (props.game.homeTeam === props.selected) {
    selectedOutcome = 1
  } else if (props.game.awayTeam === props.selected) {
    selectedOutcome = 2
  } else selectedOutcome = 0
  const getTable = (props) => {
    const StyledTitle = styled.div`
      display: flex;
      font-size: 16px;
      font-weight: bold;
      color: ${props.title === 'buy' ? '#37d697' : '#f01150'};
      width: ${props.title === 'buy' ? '54px' : '58px'};
      justify-content: space-between;
      text-transform: uppercase;
      align-items: center;
    `
    const StyledSubTitle = styled.div`
      display: flex;
      padding: 13px 0;
      & > div {
        width: 100%;
        text-align: center;
        color: #6e7e8a;
      }
    `
    const Div = styled.div`
      margin: 16px 22px;
      @media only screen and (max-width: 500px) {
        margin: 16px 3px;
      }
    `
    const printData = data => data.map((item, index) => {
      if (item.outcome !== selectedOutcome) {
        return null
      }
      return (
        <div className="rows" key={index}>
          <div className="odds">
            {item.odd}
          </div>
          <div className="amount">
            {item.amount} BX
          </div>
        </div>
      )
    })

    return (
      <Container>
        <Div>
          <StyledTitle>
            {props.title === 'buy' && <BuyIcon />}
            {props.title === 'sell' && <SellIcon />}
            <span>{props.title}</span>
          </StyledTitle>
          <StyledSubTitle>
            <div style={{ textAlign: 'left' }}> Odds </div>
            <div style={{ textAlign: 'right' }}> Amount </div>
          </StyledSubTitle>
          <StyledContent title={props.title}>
            {props.data && printData(props.data)}
          </StyledContent>
        </Div>
      </Container>
    )
  }

  const Tables = () => (
    <StyledTables>
      {getTable({ title: 'buy', data: props.data.buyOrders })}
      <Brick />
      {getTable({ title: 'sell', data: props.data.sellOrders })}
    </StyledTables>
    )

  return (
    <ComponentContainer>
      <FlexDiv>
        <TitleContainer>
          <Title>Choose Outcome Please</Title>
          <SubTitle>ORDER BOOK</SubTitle>
        </TitleContainer>
        <ChooseOutcome
          teams={props.teams}
          onSelectorChange={props.onSelectorChange}
          selected={selectedOutcome}
        />
      </FlexDiv>
      <Tables />
    </ComponentContainer>
  )
}

export default enhance(OrderBook)
