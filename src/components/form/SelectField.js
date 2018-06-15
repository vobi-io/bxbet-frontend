import React from 'react'
import styled from 'styled-components'

function SelectField(props) {
  const Container = styled.div`
    display: flex;
    width: 350px;
    justify-content: space-between;
    align-items: center;
  `
  const StyledLabel = styled.label`
    font-family: Myriad Pro;
    font-size: 14px;
    color: white;
  `

  const StyledSelect = styled.select`
        width: 258px;
        height: 40px;
        opacity: 0.9;
        border-radius: 3px;
        background-color: #ffffff;
        font-family: Myriad Pro;
        font-size: 14px;
        color: #314b5b;
        border: none;
        ::placeholder {
            font-family: Myriad Pro;
            font-size: 14px;
            color: #314b5b;
        }
        padding-left: 12px;
    `


  return (
    <Container >
      <StyledLabel>{props.title}</StyledLabel>
      <StyledSelect >
        {props.options.map((option, index) => <option value={option} key={index}>{option}</option>)}
      </StyledSelect>
    </Container>
  )
}

export default SelectField
