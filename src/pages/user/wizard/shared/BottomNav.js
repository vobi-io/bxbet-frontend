import React from 'react'
import styled from 'styled-components'

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 26px;
`

const StyledBottomNav = styled.div`
  width: 700px;
  display: flex;
`

const BottomNav = ({ children }) => (
  <StyledWrapper>
    <StyledBottomNav>{children}</StyledBottomNav>
  </StyledWrapper>
)

export default BottomNav
