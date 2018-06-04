import React from 'react'
import { withRouter } from 'react-router-dom'
import { Button } from 'vobi-components'
import styled from 'styled-components'

const Wrapper = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:center;
`
const FourOFour = ({ history }) => (
  <Wrapper>
    <div style={{width:'1400px'}}>
      <h1>Whooooops,</h1>
      <h2>This page has encountered a problem, we are currently working to fix it</h2>
      <h3 className="FourOFour-text--picton-blue">Please accept our apologies</h3>
      <Button onClick={() => history.push('/')}>Back Home</Button>
    </div>
  </Wrapper>
)

export default withRouter(FourOFour)
