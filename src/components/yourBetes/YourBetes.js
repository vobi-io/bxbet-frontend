import React from 'react'
import styled from 'styled-components'
import BuyIcon from '../availableOdds/BuyIcon'
import SellIcon from '../availableOdds/SellIcon'

import enhance from './yourBetesEnhance'

const Container = styled.div`
  margin: 11px;
  background-color: #091f2d;
  display: flex;
  flex-direction: column;
  padding: 14px;
  height: 466px;
  overflow: ${p => (p.isScrollable ? 'auto' : 'hidden')};
  overflow-x: auto;
`
const StyledRow = styled.div`
  font-family: Montserrat;
  font-size: 14px;
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  @media only screen and (max-width: 500px) {
    min-width: 400px;
  }
  cursor: ${props => (props.head ? null : 'pointer')};
  margin-bottom: ${props => (props.head ? '30px' : '0px')};
  padding: ${props => (props.head ? null : '5px 0px')};
  :hover {
    background-color: ${props => (props.head ? null : '#1f3c4f')};
  }
  .head{
    color: #6e7e8a;
  }

  & > div > .flag {
    width: 32px;
    margin-right: 9px;
  }

  & > .rigth-side {
    display: flex;
    width: 500px;
    justify-content: space-between;

    & > div {
      width: 100%;
      text-align: center;
      @media only screen and (max-width: 500px) {
        min-width: 80px;
    }
  }
  }
`
const Line = styled.div`
  height: 1px;
  background-color: #4b5963;
  margin: 11px 0;
  @media only screen and (max-width: 500px) {
    min-width: 392px;
  }
`
const Message = styled.div`
  color: #ffffff;
  font-weight: bold;
  text-align: center;
  font-family: Montserrat;
  margin-top: 60px;
`
const ComponentContainer = styled.div`
  min-width: 48.6%;
  background-color: #122d3e;
  margin-right: 11px;
  font-family: Montserrat;
`
const Title = styled.div`
  margin-top: 31px;
  margin-left: 15px
  margin-bottom: 27px;
  color: #ffffff;
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 500;
`
const OrderType = styled.div`
  display: flex;
  font-size: 16px;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  color: ${props => (props.orderType === 'Buy' ? '#37d697' : '#f01150')};
  @media only screen and (max-width: 500px) {
    min-width: 80px;
  }
`
const Div = styled.div`
  border-radius: 2px;
  background-color: #122d3e;
  width: fit-content;
  padding: 3px 10px;
  @media only screen and (max-width: 500px) {
    min-width: 50px;
  }
`
const StatusContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 500px) {
    min-width: 80px;
  }
`
const StatusDot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  margin-right: 8px;
  background-color: ${props => (props.status === 'Open' ? '#37d697' : '#f01150')}
`
const FlexDiv = styled.div`
  display: flex;
  justify-content: ${props => (props.stake ? 'flex-end' : 'center')};
  align-content: center;
`
const Country = styled.div`
  display: flex;
  width: 150px;
  align-items: center;
  @media only screen and (max-width: 500px) {
    min-width: 80px;
  }
`
const YourBetes = ({ yourBetesData, teams, ...props }) => {
  const data = yourBetesData()
  function Body() {
    return (
      <Container isScrollable={!!(data.length > 3)}>
        <StyledRow head>
          <div style={{ width: '150px' }} className="head">Outcome</div>
          <div className="rigth-side">
            <div className="head">Buy/Sell</div>
            <div className="head">Odds</div>
            <div className="head">Stake</div>
            <div className="head">Status</div>
          </div>
        </StyledRow>
        {props.me && data && data.map((item, index) => (
          <div key={index}>
            <StyledRow status={item.orderType}>
              <Country>
                {/* {returnFlagUrl(teams[item.outcome], true)} */}
                <span>{teams[item.outcome]}</span>
              </Country>
              <div className="rigth-side">
                <OrderType orderType={item.orderType}>
                  {item.orderType === 'Buy' && <BuyIcon />}
                  {item.orderType === 'Sell' && <SellIcon />}
                  <span style={{ marginLeft: 5 }}>{item.orderType}</span>
                </OrderType>
                <FlexDiv><Div>{item.odd}</Div></FlexDiv>
                <FlexDiv stake><Div>{item.stake} BX </Div></FlexDiv>
                <StatusContainer><StatusDot status={item.status} />{item.status}</StatusContainer>
              </div>
            </StyledRow>
            <Line />
          </div>
        ))}
        {!props.me &&
          <Message>Please log in</Message>
        }
      </Container>
    )
  }

  return (
    <ComponentContainer>
      <Title>Your Bets</Title>
      <Body />
    </ComponentContainer>
  )
}

export default enhance(YourBetes)
