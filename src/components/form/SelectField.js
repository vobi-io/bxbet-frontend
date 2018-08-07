import React from 'react'
import styled from 'styled-components'

function SelectField(props) {
  const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `
  const StyledLabel = styled.label`
    font-family: Montserrat;
    font-size: 14px;
    color: #6e7e8a;
    width: 35%;
  `

  const StyledSelect = styled.select`
    width: ${props.title === 'Category' ? '98%' : '100%'};
    outline: none;
    margin-left: 4%;
    height: 40px;
    opacity: 0.9;
    border-radius: 3px;
    background-color: transparent;
    font-family: Montserrat;
    font-size: 14px;
    color: #ffffff;
    border: solid 1px #4b5963;
    ::placeholder {
        font-family: Montserrat;
        font-size: 14px;
        color: #314b5b;
    }
    padding-left: 12px;
  `
  const StyledOption = styled.option`
    background-color: #091f2d;
  `

  return (
    <Container >
      <StyledLabel>{props.title}</StyledLabel>
      <StyledSelect onChange={props.onChange} name={props.title} value={props.selected}>
        {props.options.map((option, index) => <StyledOption value={option} key={index} >{option}</StyledOption>)}
      </StyledSelect>
    </Container>
  )
}

export default SelectField
