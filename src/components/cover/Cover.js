import React from 'react'
import styled from 'styled-components'
import Stadium from '../../resources/assets/img/stadium.png'

function Cover(props) {
  const StyledCover = styled.div`
    background-size: 100% 114%;
    background-position-x: 3px;
    background-position-y: -4px;
    background-repeat: no-repeat;
    width: 100%;
    height: 105px;
    box-sizing: border-box;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(${Stadium});
    font-family: Open Sans;
    font-size: 32px;
    font-weight: bold;
    text-transform: uppercase;
    color: #e6f1f8;
    text-shadow: 0px 3px 9.5px rgba(0, 0, 0, 0.28);
    cursor: pointer;
    text-align: center;
  `


  return (
    <div style={{ width: '100%', height: '105px' }}>
      <StyledCover>
        {props.text}
      </StyledCover>
    </div>

  )
}

export default Cover
