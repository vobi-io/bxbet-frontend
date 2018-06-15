import React from 'react'
import styled from 'styled-components'

import Card from '../card'

const MoreInfo = (props) => {
  const BlueBrick = styled.div`
    width: 15px;
    height: 15px;
    border-radius: 5px;
    background-color: #265271;
    box-shadow: 0px 3px 9.5px 0.5px rgba(0, 0, 0, 0.1);
    margin-right: 6px;
  `
  const Container = styled.div`
    margin-bottom: -37px;
  `

  const StyledItem = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 37px;

    & > .item {
        font-family: Montserrat;
        font-size: 14px;
        color: #0f334b;
    }
  `


  function Body() {
    const Data = props.data.map((item, index) => (

      <StyledItem key={index}>
        <BlueBrick />
        <span className="item">{item}</span>
      </StyledItem>
        ))

    return (
      <Container> {Data} </Container>
    )
  }

  return <Card title={'Information'} content={Body} width="534px" />
}

export default MoreInfo
