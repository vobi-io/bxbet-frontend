import React from 'react'
import styled from 'styled-components'

import Card from '../card'
import enhance from './orderBookEnhance'
// import sortData from './sortData'

const Container = styled.div`
      width: 100%;
      height: 488px;
      border-radius: 5px;
      background-color: #0f334b;
      box-shadow: 0px 3px 9.5px 0.5px rgba(7, 140, 255, 0.1);
      font-family: Open Sans;
      font-size: 14px;
      color: white;
      overflow: hidden;
    `

const StyledContent = styled.div`
border-top: solid 1px #92acfe;

& .rows {
  display: flex;
  border-bottom: solid 1px #92acfe;
  align-items: center;

  & .odds, & .amount {
    width: 100%;
    text-align: center;
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
      width: 100%;
    `
const Brick = styled.div`
      width: 2%;
    `


const OrderBook = ({ ...props }) => {
  const getTable = (props) => {
    const StyledTitle = styled.div`
      text-transform: uppercase;
      color: white;
      height: 32px;
      background-image: ${props.title === 'buy' ? 'linear-gradient(to bottom, #7fac30, #288702 99%)' : 'linear-gradient(to bottom, #ed2b3b, #9f041b);'};
      font-family: Montserrat;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 5px 5px 0 0;
    `
    const StyledSubTitle = styled.div`
      display: flex;
      padding: 13px 0;
      & > div {
        width: 100%;
        text-align: center;
      }
    `
    const printData = data => data.map((item, index) => (
      <div className="rows" key={index}>
        <div className="odds">
          {item.odd}
        </div>
        <Line />
        <div className="amount">
          {item.amount} BX
        </div>
      </div>
    ))


    return (
      <Container>
        <StyledTitle>{props.title}</StyledTitle>
        <StyledSubTitle>
          <div> Odds </div>
          <div> Amount </div>
        </StyledSubTitle>
        <StyledContent>
          {props.data && printData(props.data)}
        </StyledContent>
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

  return <Card title={'Order Book'} width="100%"><Tables /> </Card>
}

export default enhance(OrderBook)
