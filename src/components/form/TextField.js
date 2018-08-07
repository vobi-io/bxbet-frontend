import React from 'react'
import styled from 'styled-components'

const Container = styled.div `
display: flex;
justify-content: space-between;
align-items: center;
`
const StyledLabel = styled.label `
font-family: Montserrat;
font-size: 14px;
color: #6e7e8a;
width: 37%;
`

const StyledInput = styled.input `
    width: 100%;
    margin-left: 4%;
    height: 38px;
    opacity: 0.9;
    border-radius: 3px;
    background-color: transparent;
    font-family: Montserrat;
    font-size: 14px;
    font-weight: ${props => (props.odd ? 'bold' : '')};
    color: ${props => (props.odd ? '#37d697' : '#ffffff')};
    outline: none;
    border: ${props => (props.isValidInput ? 'solid 1px #4b5963' : '2px solid red')};
    ::placeholder {
        font-family: Montserrat;
        font-size: 14px;
        color: #314b5b;
    }
    padding-left: 16px;
`
const Icon = styled.div `
    font-family: Montserrat;
    font-size: 14px;
    color: #314b5b;
    right: 505px;
    transform: translate(-30px, 3px);
    width: 0;
`

const TextField = ({ title, value, onChange, icon, isValidInput, typeStyle, type, odd }) => (
  <Container>
    <StyledLabel>{title}</StyledLabel>
    <StyledInput
      className={typeStyle}
      type={type}
      name={title.toLowerCase()}
      value={value}
      onChange={onChange}
      isValidInput={isValidInput === undefined ? true : isValidInput}
      odd={odd}
    />
    {icon
      ? <Icon>{icon}</Icon>
      : null}
  </Container>
)

export default TextField
