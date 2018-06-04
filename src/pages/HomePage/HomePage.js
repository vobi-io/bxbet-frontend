import React from 'react'
import styled from 'styled-components'


const Container = styled.div`
    width: 1400px;
    height: 3000px;
    background-color: #ffffff;
`
const Wrapper = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:center;
`


const HomePage = () => (
  <Wrapper>
    <Container>
      <h1>Home Page</h1>
    </Container>
  </Wrapper>
)

export default HomePage
