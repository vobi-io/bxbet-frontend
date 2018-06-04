import React from 'react'
import styled from 'styled-components'

const StyledWrapper = styled.div`
  display: flex;
`

const Breadcrumb = props => <StyledWrapper>{props.children}</StyledWrapper>

export default Breadcrumb
