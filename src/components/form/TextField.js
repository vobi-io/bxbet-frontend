import React from 'react'
import styled from 'styled-components'

function TextField(props) {
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

  const StyledInput = styled.input`
        width: 242px;
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
        padding-left: 16px;
    `
  const Icon = styled.div`
        font-family: Myriad Pro;
        font-size: 14px;
        color: #314b5b;
        right: 505px;
        position: absolute;
  `


  return (
    <Container >
      <StyledLabel>{props.title}</StyledLabel>
      <StyledInput type="text" placeholder={props.placeHolder} />
      {props.icon ? <Icon>{props.icon}</Icon> : null}
    </Container>
  )
}

export default TextField
