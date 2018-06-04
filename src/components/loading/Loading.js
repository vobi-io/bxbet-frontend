import React from 'react'
import styled from 'styled-components'

const StyledLoading = styled.span`
  color: blue;
`
const Loading = ({ message }) => <StyledLoading>{message}</StyledLoading>

export default Loading
