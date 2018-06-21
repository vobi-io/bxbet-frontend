import React from 'react'
import styled from 'styled-components'

import { Link } from 'react-router-dom'

const InfoList = (props) => {
  const ItemContainer = styled.div`
    background-color: #44555d;
    margin-bottom: 3px;
    display: flex;
    padding: 6px;
    align-items: center;

    & h2{
        font-family: Montserrat;
        font-size: 14px;
        color: #e7ebed;
        margin: 0;
    }

    & span{
        opacity: 0.5;
        font-family: Open Sans;
        font-size: 12px;
        color: white;
    }
  `

  const Status = styled.div`
    width: 9px;
    height: 9px;
    margin: 0 14px 0 9px;
    border-radius: 5px;
    background-color: ${props => props.status === 'In Progress' ? '#30ff00' : '#000'};
    border: solid 1px #000000; 
  `

  const List = () => props.data.map((item, index) => (
    <ItemContainer key={index}>
      <Status status={item.status} />
      <div>
        <Link to={`/${item.gameId}`} style={{ textDecoration: 'none' }}>
          <h2>
            {item.team1} - {item.team2}
          </h2>
        </Link>
        <span>
          {item.date}
        </span>
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
