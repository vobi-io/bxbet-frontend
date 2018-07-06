import React from 'react'
import styled from 'styled-components'

const StyledButon = styled.button`
    height: ${({ buttonType }) => buttonType ? '54px' : '39px'};
    width: 100%;
    box-sizing: border-box;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: ${({ buttonType }) => buttonType === 'active' ? '0px 3px 9.5px 0.5px rgba(0,0,0,0.1)' : buttonType === 'cta' ? 'box-shadow: 0px 1px 5px 0 rgba(0, 0, 0, 0.5)' : null} ;
    border: ${({ buttonType }) => buttonType !== 'active' || buttonType !== 'cta' ? 'solid 1px #265271' : 'none'};
    color: ${({ buttonType }) => buttonType === 'active' || buttonType === 'cta' ? '#fff' : '#265271'};
    background: white;
    background-image: ${({ buttonType }) => buttonType === 'active' ? 'linear-gradient(#265271, #265271)' : buttonType === 'cta' ? 'linear-gradient(to bottom, #fa7a0a, #f43003)' : null};
    font-family: Montserrat;
    font-size: 16px;
    cursor: pointer;
    &:focus {outline:0;}
  `

const Button = (props) => {
  let buttonType = 'regular'
  if (props.activeButton) {
    buttonType = 'active'
  } else if (props.cta) {
    buttonType = 'cta'
  }

  return (
    <StyledButon onClick={props.onClick} buttonType={buttonType}>
      {props.text}
    </StyledButon>
  )
}

export default Button
