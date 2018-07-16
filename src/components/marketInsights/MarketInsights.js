import React from 'react'
import styled from 'styled-components'

import Card from '../card'
import enhance from './marketInsightsEnhance'

const BlueBrick = styled.div`
    width: 15px;
    height: 15px;
    border-radius: 5px;
    background-color: ${props => props.active ? '#79A92C' : '#265271'};
    box-shadow: 0px 3px 9.5px 0.5px rgba(0, 0, 0, 0.1);
    margin-right: 6px;
  `
const Container = styled.div`
    margin-bottom: -37px;
  `

const StyledItem = styled.div`
    display: flex;
    align-items: center;
    margin: 36px 0 0 26px;

    & > .item {
        font-family: Montserrat;
        font-size: 14px;
        color: #0f334b;
    }
  `

const MarketInsights = ({ game, teams }) => {
  const { status } = game
  function Body() {
    const Data = teams.map((team, index) => (
      <StyledItem key={index}>
        <BlueBrick active={index === status} />
        <span className="item">{team} {index !== 1 ? 'Wins' : null}</span>
      </StyledItem>
        ))

    return (
      <Container> {Data} </Container>
    )
  }

  return <Card title={'Market Insights'} width="15%"><Body /> </Card>
}

export default enhance(MarketInsights)
