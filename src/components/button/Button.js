import React from 'react'
import styled from 'styled-components'

const StyledButon = styled.button`
    height: ${({ buttonType }) => (buttonType === 'cta' ? '41px' : '39px')};
    width: 100%;
    box-sizing: border-box;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;                                                                                                                                                                                                                                                                                                                                                                                                            
    font-size: 16px;
    border: ${({ buttonType }) => buttonType !== 'active' || buttonType !== 'cta' ? 'solid 1px #265271' : 'none'};
    color: ${({ buttonType }) => buttonType === 'active' || buttonType === 'cta' ? '#091f2d' : '#265271'};
    background-color: ${({ buttonType }) => buttonType === 'cta' ? '#37d697' : null};
    background: ${({ buttonType }) => (buttonType === 'outcome' || buttonType === 'active' ? 'transparent' : null)};
    border: ${({ buttonType }) => (buttonType === 'outcome' ? '1px solid #4b5963' : null)};
    color: ${({ buttonType }) => (buttonType === 'outcome' ? '#4b5963' : null)};
    color: ${({ buttonType }) => (buttonType === 'active' ? '#37d697' : null)};
    border: ${({ buttonType }) => (buttonType === 'active' ? '1px solid #37d697' : null)};
    min-width: ${({ buttonType }) => (buttonType === 'outcome' || 'active' ? '105px' : null)};
    height: ${({ buttonType }) => (buttonType === 'outcome' || 'active' ? '40px' : null)};
    font-size: ${({ buttonType }) => (buttonType === 'outcome' || 'active' ? '14px' : '')};

    font-family: Montserrat;
    cursor: pointer;
    &:focus {outline:0;}
  `

const Button = (props) => {
  let buttonType = 'regular'
  if (props.activeButton) {
    buttonType = 'active'
  } else if (props.cta) {
    buttonType = 'cta'
  } else if (props.outcome) {
    buttonType = 'outcome'
  }

  return (
    <StyledButon onClick={props.onClick} buttonType={buttonType}>
      {props.text}
    </StyledButon>
  )
}

export default Button
