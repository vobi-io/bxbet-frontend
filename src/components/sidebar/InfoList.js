import React from 'react'
import styled from 'styled-components'

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
        <h2>
          {item.countryOne} - {item.countryTwo}
        </h2>
        <span>
          {item.time}
        </span>
      </div>
    </ItemContainer>
        ))

  return (
    <div style={{ marginTop: '3px' }}>
      <List />
    </div>
  )
}

export default InfoList
