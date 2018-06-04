import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`

const StyledContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-between; */
  width: 1200px;
  box-sizing: border-box;
  & > div {
    /* flex: 1 0 267px; */
    margin-right: 44px;
    margin-top: 49px;
  }
  & > :nth-child(4n) {
    margin-right: 0px;
  }
`

const Artists = () => (
  <Wrapper>
    <StyledContainer />
  </Wrapper>
)

export default Artists
