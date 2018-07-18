import React from 'react'
import styled from 'styled-components'

function SelectField(props) {
  const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `
  const StyledLabel = styled.label`
    font-family: Myriad Pro;
    font-size: 14px;
    color: white;
    width: 24%;
  `

  const StyledSelect = styled.select`
        width: 100%;
        margin-left: 3.7%;
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
      <StyledSelect onChange={props.onChange} name={props.title} value={props.selected}>
        {props.options.map((option, index) => <option value={option} key={index} >{option}</option>)}
      </StyledSelect>
    </Container>
  )
}

export default SelectField
