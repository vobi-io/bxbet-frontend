import React from 'react'
import styled from 'styled-components'

import coverPhoto from '../../resources/assets/img/stadium.png'

function Cover(props) {
  const StyledCover = styled.div`
    width: 100%;
    height: 105px;
    box-sizing: border-box;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(https://www.barcelona-tourist-guide.com/images/int/sport/barcelona-fc/L/fc-barcelona-0609.jpg);
    background-size: cover;
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
