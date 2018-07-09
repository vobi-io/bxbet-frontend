import React from 'react'
import styled from 'styled-components'

import Card from '../card'
import enhance from './yourBetesEnhance'
import returnFlagUrl from '../../hocs/returnFlagUrl/returnFlagUrl'

const Container = styled.div`
  border-radius: 6px;
  background-color: #0f334b;
  box-shadow: 0px 3px 9.5px 0.5px rgba(7, 140, 255, 0.1);
  display: flex;
  flex-direction: column;
  padding: 20px;
  overflow: hidden;
`
const StyledRow = styled.div`
  font-family: Montserrat;
  font-size: 14px;
  color: ${props => (props.status === 'Sell' ? '#cc3c40' : '#fff')};
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;

  & > div > .flag {
    width: 32px;
    height: 22px;
    margin-right: 9px;
  }

  & > .rigth-side {
    display: flex;
    width: 500px;
    justify-content: space-between;

    & > div {
      width: 100%;
      text-align: center;
    }
  }
`
const Line = styled.div`
  height: 1px;
  opacity: 0.2;
  background-color: #447491;
  margin: 8px 0;
`

const StyledFlag = styled.img`
  margin-right: 8px;
  height: 32px;
`

const YourBetes = ({ yourBetesData, teams }) => {
  const data = yourBetesData()

  function Body() {
    return (
      <Container>
        <StyledRow>
          <div>Outcome</div>
          <div className="rigth-side">
            <div>Buy/Sell</div>
            <div>Odds</div>
            <div>Stake</div>
            <div>Status</div>
          </div>
        </StyledRow>
        <Line />
        {data.map((item, index) => (
          <div key={index}>
            <StyledRow status={item.orderType}>
              <div style={{ display: 'flex', width: '150px', alignItems: 'center' }}>
                <StyledFlag src={returnFlagUrl(teams[index])} />
                <span>{teams[index]}</span>
              </div>
              <div className="rigth-side">
                <div>{item.orderType}</div>
                <div>{item.odd}</div>
                <div>{item.stake} BX </div>
                <div>{item.status}</div>
              </div>
            </StyledRow>
            <Line />
          </div>
        ))}
      </Container>
    )
  }

  return (
    <Card title={'Your Betes'} width="100%">
      <Body />{' '}
    </Card>
  )
}

export default enhance(YourBetes)
