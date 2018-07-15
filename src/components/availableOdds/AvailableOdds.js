import React from 'react'
import styled from 'styled-components'

import enhancer from './availableOddsEnhancer'
import Card from '../card'
import returnFlagUrl from '../../hocs/returnFlagUrl/returnFlagUrl'

const ContentContainer = styled.div`
  border-radius: 0 0 5px 5px;
  background-color: #0f334b;
  padding: 0px 9px;
`
const TableItem = styled.div`
  display: flex;
  align-items: center;
  margin: 6px 0;
  height: 100%;

  .country-info {
    display: flex;
    margin-right: 20px;
    align-items: center;
    width: 150px;

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

    span {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 3px;
      opacity: 0.9;
      border-radius: 3px;
      background-image: linear-gradient(to top, #ffffff, #d7d7d7 51%, #ffffff 99%);
      font-family: Myriad Pro;
      font-size: 14px;
    }
    .bigOnes {
      width: 50px;
      height: 35px;
    }
    .green {
      background-image: linear-gradient(to bottom, #7fac30, #288702 99%);
      color: white;
    }
    .red {
      background-image: linear-gradient(to bottom, #ed2b3b, #9f041b);
      color: white;
    }
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
    }
  }
  .buy-items {
    margin-right: 15px;
  }
`

const AvailableOdds = ({ sortedData, teams }) => {
  const Body = () => {
    const tableArray = []
    let index = 0
    for (const key in sortedData) {
      const Buy = sortedData[key].buy.map((obj, i, arr) => (
        <div className="table-item" key={i}>
          <span className={arr.length === i + 1 ? 'green bigOnes' : 'bigOnes'}>{obj.odd}</span>
          <span className={arr.length === i + 1 ? 'green' : ''}>{obj.amount}</span>
        </div>
      ))
      const Sell = sortedData[key].sell.map((obj, i) => (
        <div className="table-item" key={i}>
          <span className={i === 0 ? 'red bigOnes' : 'bigOnes'}>{obj.odd}</span>
          <span className={i === 0 ? 'red' : ''}>{obj.amount}</span>
        </div>
      ))
      tableArray.push(
        <TableItem key={index}>
          <div className="country-info">
            {returnFlagUrl(teams[index], true)}
            <h2>{teams[index]}</h2>
          </div>
          <div className="table">
            <div>
              <div className="buy-items">{Buy}</div>
              <div className="sell-items">{Sell}</div>
            </div>
          </div>
        </TableItem>
      )
      index += 1
    }
    return <ContentContainer>{tableArray}</ContentContainer>
  }

  return (
    <Card title="Available odds" width="53.5%" bgColor="#0f334b">
      <Body />
    </Card>
  )
}

export default enhancer(AvailableOdds)