import React from 'react'
import styled from 'styled-components'

const StyledError = styled.span`
  color: red;
`
const Error = ({ message }) => <StyledError>{message}</StyledError>

export default Error
