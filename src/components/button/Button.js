import React from 'react'
import styled from 'styled-components'

function Button(props) {
  const StyledButon = styled.button`
    height: ${props.cta ? '54px' : '39px'};
    width: 100%;
    box-sizing: border-box;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: ${props.activeButton ? '0px 3px 9.5px 0.5px rgba(0,0,0,0.1)' : props.cta ? 'box-shadow: 0px 1px 5px 0 rgba(0, 0, 0, 0.5)' : null} ;
    border: ${!props.activeButton || !props.cta ? 'solid 1px #265271' : 'none'};
    color: ${props.activeButton || props.cta ? '#fff' : '#265271'};
    background: white;
    background-image: ${props.activeButton ? 'linear-gradient(#265271, #265271)' : props.cta ? 'linear-gradient(to bottom, #fa7a0a, #f43003)' : null};
    font-family: Montserrat;
    font-size: 16px;
    cursor: pointer;
  `

  return (
    <StyledButon onClick={props.onClick}>
      {props.text}
    </StyledButon>
  )
}

export default Button
