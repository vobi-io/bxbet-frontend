import React from 'react'
import styled from 'styled-components'

const Container = styled.div `
display: flex;
justify-content: space-between;
align-items: center;
`
const StyledLabel = styled.label `
font-family: Myriad Pro;
font-size: 14px;
color: white;
width: 25%;
`

const StyledInput = styled.input `
    width: 100%;
    margin-left: 4%;
    height: 40px;
    opacity: 0.9;
    border-radius: 3px;
    background-color: #ffffff;
    font-family: Myriad Pro;
    font-size: 14px;
    color: #314b5b;
    border: ${props => props.isValidInput ? 'none' : '2px solid red'};
    ::placeholder {
        font-family: Myriad Pro;
        font-size: 14px;
        color: #314b5b;
    }
    padding-left: 16px;
`
const Icon = styled.div `
    font-family: Myriad Pro;
    font-size: 14px;
    color: #314b5b;
    right: 505px;
    transform: translate(-30px, 3px);
    width: 0;
`

const TextField = ({ title, value, onChange, icon, isValidInput, key }) => (
  <Container>
    <StyledLabel>{title}</StyledLabel>
    <StyledInput
      className={key}
      type="text"
      name={title.toLowerCase()}
      value={value}
      onChange={onChange}
      isValidInput={isValidInput === undefined ? true : isValidInput}
    />
    {icon
      ? <Icon>{icon}</Icon>
      : null}
  </Container>
)

export default TextField
