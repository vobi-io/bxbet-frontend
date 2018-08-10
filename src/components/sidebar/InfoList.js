import React from 'react'
import styled from 'styled-components'

import { Link } from 'react-router-dom'

import TimeIcon from '../cover/TimeIcon'

const InfoList = (props) => {
  const ItemContainer = styled.div`
    background-color: #091f2d;
    margin-bottom: 3px;
    display: flex;
    align-items: center;

    :hover {
      background-color: #1f3c4f;
    }
    & h2{
        font-family: Montserrat;
        font-size: 14px;
        color: #e7ebed;
        margin: 0;
        font-weight: normal;
    }

    & span{
       margin-right: 18px;
       color: #6e7e8a;
       font-size: 11px;
    }
  `

  const Status = styled.div`
    width: 1px;
    height: 56px;
    margin-right: 15px;
    background-color: ${props => props.status === 3 ? '#37d697' : '#f01150'};
  `
  const FlexDiv = styled.div`
    display: flex;
    margin-top: 5px;
  `
  const Time = styled.span`
    font-family: Montserrat;
    font-size: 11px;
    color: white;
    color: #6e7e8a;
    margin: 0px;
    margin-left: 4px;
    margin-top: -2px;
  `

  const timeFormater = (timestamp) => {
    const date = new Date()

    const day = date.getDay(timestamp)
    const month = date.getMonth(timestamp)
    const hour = date.getHours(timestamp)
    const minute = date.getMinutes(timestamp)

    const Text = `${day}/${month} ${hour}:${minute}`

    return Text
  }

  const List = () => props.data.map((item, index) => (
    <ItemContainer key={index}>
      <Status status={item.status} />
      <div>
        <Link to={`/${item._id}`} style={{ textDecoration: 'none' }}>
          <h2>
            {item.homeTeam} - {item.awayTeam}
          </h2>
        </Link>
        <FlexDiv>
          <span>2/6</span>
          <TimeIcon />
          <Time>
            {timeFormater(item.startDate)}
          </Time>
        </FlexDiv>
      </div>
    </ItemContainer>
        ))

  return (
    <div style={{ marginTop: '3px' }}>
      {
        props.loading ? <div style={{ color: 'white', marginTop: '10px' }}>Loading...</div> : <List />
      }
    </div>
  )
}

export default InfoList
