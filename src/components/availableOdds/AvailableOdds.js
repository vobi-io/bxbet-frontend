import React from 'react'
import styled from 'styled-components'

import enhancer from './availableOddsEnhancer'
import BuyIcon from './BuyIcon'
import SellIcon from './SellIcon'

const ContentContainer = styled.div`
  border-radius: 0 0 5px 5px;
  padding: 0px 9px;
`
const TableItem = styled.div`
  display: flex;
  align-items: center;
  margin: 6px 0;
  height: 100%;

  .country-info {
    display: flex;
    align-items: center;
    min-width: 90px;
    margin-right: 3px;
    width: 9%;

    img,
    .flag {
      width: 32px;
      margin-right: 9px;
    }

    h2 {
      margin: 0;
      font-family: Montserrat;
      font-size: 14px;
      color: white;
      font-weight: normal;
    }
  }
  .table {
    display: flex;
    color: #314b5b;
    justify-content: space-evenly;
  }
  .table > div {
    display: flex;
  }
  .buy-items,
  .sell-items {
    display: flex;
    .table-item {
      display: flex;
      flex-direction: column;
      cursor: pointer;
    }
  }
  .buy-items {
    margin-right: 15px;
  }
`

const FlexDiv = styled.div`
  display: flex;
  width: 100%;
`

// ==============================================================================================================
const Container = styled.div`
  min-width: 50.566%;
  background-color: #122d3e;
  margin-right: 11px;
  font-family: Montserrat;
  @media only screen and (max-width: 1024px) {
    margin-bottom: 10px;
  }
`
const Title = styled.div`
  margin-top: 20px;
  margin-left: 15px
  margin-bottom: 20px;
  color: #ffffff;
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 500;
`
const Body = styled.div`
  overflow-x: auto;
  background-color: #091f2d;
  margin: 11px;
  min-height: 150px;
`
const OrderContainer = styled.div`
  font-family: Montserrat;
  font-size: 14px;
  background-color: #122d3e;
  display: flex;
  flex-direction: column;
  margin: 3px;
  width: 64px;
  height: 44px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  :hover{
    background-color: #1f3c4f;
  }
`
const Odd = styled.span`
  color: #ffffff;
  font-weight: bold;
  font-size: 14px;
  color: ${props => (props.red === 'red' ? '#f01150' : '')};
  color: ${props => (props.green === 'green' ? '#37d697' : '')};
`
const Amount = styled.span`
  color: #6e7e8a;
  font-size: 13px;
`
const LittleTitles = styled.div`
  display: flex;
  flex-direction: column;
  color: #6e7e8a;
  font-size: 10px
  margin-right: 10px;
  align-items: flex-end;
`
const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`
const Line = styled.div`
  height: 1px;
  background-color: #4b5963;
  display: ${props => (props.index === 2 ? 'none' : '')};
  min-width: 555px;
`
const LableBuy = styled.div`
  display: flex;
  font-size: 16px;
  font-weight: bold;
  color: #37d697;
  margin-left: 146px;
  width: 58px;
  justify-content: space-between;
`
const LableSell = styled.div`
  display: flex;
  font-size: 16px;
  font-weight: bold;
  color: #f01150;
  margin-left: 169px;
  width: 60px;
  justify-content: space-between;
`

const handleClick = (onOddClick, onSelectorChange, odd, amount, activeTab, key, teams) => {
  let team = ''
  if (key === 'homeRow') {
    team = teams[0]
  } else if (key === 'awayRow') {
    team = teams[1]
  } else {
    team = teams[2]
  }
  onOddClick(odd, amount, activeTab)
  if (odd === 0 || amount === 0) {
    return
  }
  onSelectorChange(team)
}
const AvailableOdds = ({ sortedData, teams, onOddClick, onSelectorChange }) => {
  const TableBody = () => {
    const tableArray = []
    let index = 0
    for (const key in sortedData) {
      const Buy = sortedData[key].buy.map((obj, i, arr) => (
        <OrderContainer key={i} onClick={() => handleClick(onOddClick, onSelectorChange, obj.odd, obj.amount, 'buy', key, teams)}>
          <Odd green={arr.length === i + 1 ? 'green' : ''}>{obj.odd}</Odd>
          <Amount>{obj.amount}{' '}{'BX'}</Amount>
        </OrderContainer>
      ))
      const Sell = sortedData[key].sell.map((obj, i) => (
        <OrderContainer key={i} onClick={() => handleClick(onOddClick, onSelectorChange, obj.odd, obj.amount, 'sell', key, teams)}>
          <Odd red={i === 0 ? 'red' : ''}>{obj.odd}</Odd>
          <Amount>{obj.amount}{' '}{'BX'}</Amount>
        </OrderContainer>
      ))
      tableArray.push(
        <FlexColumn key={index}>
          <TableItem>
            <div className="country-info">
              <h2>{teams[index]}</h2>
            </div>
            <LittleTitles>
              <span style={{ marginBottom: '5px' }}>ODDS</span>
              <span>MAX</span>
            </LittleTitles>
            <div className="table">
              <div>
                <div className="buy-items">{Buy}</div>
                <div className="sell-items">{Sell}</div>
              </div>
            </div>
          </TableItem>
          <Line index={index} />
        </FlexColumn>
      )
      index += 1
    }
    return <ContentContainer>{tableArray}</ContentContainer>
  }
  return (
    <Container>
      <Title>Available Offers</Title>
      <Body>
        <FlexDiv style={{ paddingTop: '17px' }}>
          <LableBuy>
            <BuyIcon />
            <span style={{ marginTop: '-3px' }}>BUY</span>
          </LableBuy>
          <LableSell>
            <SellIcon />
            <span style={{ marginTop: '-3px' }}>SELL</span>
          </LableSell>
        </FlexDiv>
        <TableBody />
      </Body>
    </Container>
  )
}

export default enhancer(AvailableOdds)
