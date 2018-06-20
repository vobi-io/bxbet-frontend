import React from 'react'
import styled from 'styled-components'

import Card from '../card'

const ConttentContainer = styled.div`
  border-radius: 0 0 5px 5px;
  background-color: #0f334b;
  margin: -20px;
  padding: 6px 20px;
  height: 84%;
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
    width: 0;

    img {
      width: 32px;
      height: 20px;
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
  .table{
      display: flex;
      color: #314b5b;
      width: 100%;
      justify-content: space-evenly;
      margin-left: 100px;
      
      span{
        padding: 3px 20px;
        margin: 3px;
        text-align: center;
        opacity: 0.9;
        border-radius: 3px;
        background-image: linear-gradient(to top, #ffffff, #d7d7d7 51%, #ffffff 99%);
        font-family: Myriad Pro;
        font-size: 14px;
      }
      .bigOnes{
          padding: 10px 20px;
      }
      .green{
        background-image: linear-gradient(to bottom, #7fac30, #288702 99%);
        color: white;
      }
      .red{
        background-image: linear-gradient(to bottom, #ed2b3b, #9f041b);
        color: white;
      }
  }
`

const Table = (props) => {
  const Body = () => {
    const content = props.data.map((item, index) => (
      <TableItem key={index}>
        <div className="country-info">
          <img src={item.Flag} alt="Flag" />
          <h2>{item.country}</h2>
        </div>
        <div className="table">
          <div style={{ marginRight: '2%' }}>
            {item.buy.map((element, i) => {
              let classNm = i > 0 && (i + 1) % 3 === 0 ? 'green' : ''
              classNm = i < 3 ? classNm.concat(' bigOnes') : classNm.concat('')
              return (
                <div style={{ display: 'inline' }} key={i}>
                  <span className={classNm}>{element}</span>
                  {i === 2 ? <div style={{ display: 'inline', lineHeight: '35px' }}><br /></div> : null}
                </div>
              )
            })}
          </div>
          <div>
            {item.sell.map((element, i) => {
              let classNm = i % 3 === 0 ? 'red' : ''
              classNm = i < 3 ? classNm.concat(' bigOnes') : classNm.concat('')
              return (
                <div style={{ display: 'inline' }} key={i}>
                  <span className={classNm}>{element}</span>
                  {i === 2 ? <div style={{ display: 'inline', lineHeight: '35px' }}><br /></div> : null}
                </div>
              )
            })}
          </div>
        </div>
      </TableItem>
        ))

    return (
      <ConttentContainer>
        {content}
      </ConttentContainer>
    )
  }

  return <Card title="Table" content={Body} width="48%" bgColor="#0f334b" />
}

export default Table
