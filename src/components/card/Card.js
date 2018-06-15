import React from 'react'
import styled from 'styled-components'

function Card(props) {
  const StyledCard = styled.div`

    margin-top:50px;
    width: 534px;

    border-radius: 5px;
    background-color: #ffffff;
    box-shadow: 0px 3px 9.5px 0.5px rgba(7, 140, 255, 0.1); 
  `
  const StyledCardTitle = styled.div`
    height: 30px;
    border-radius: 5px 5px 0 0;
    display: flex;
    align-items: center;
    padding-left: 20px;
    background-image: linear-gradient(to bottom, #32b6ff, #0687d9 99%);
    color: white;
    font-family: Montserrat;
    font-size: 16px;
    text-shadow: 0px 1px 5px rgba(0, 0, 0, 0.5);
  `
  const StyledContent = styled.div`
    padding: 20px;
  `

  return (
    <StyledCard>
      <StyledCardTitle>
        {props.title}
      </StyledCardTitle>
      <StyledContent>
        {props.content()}
      </StyledContent>
    </StyledCard>
  )
}

export default Card
