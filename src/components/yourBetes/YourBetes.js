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
  min-height: 171px;
  overflow: ${p => (p.isScrollable ? 'auto' : 'hidden')};
  max-height: ${p => (p.isScrollable ? '171px' : '')};
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
const Message = styled.div`
  color: #ffffff;
  font-weight: bold;
  text-align: center;
  font-family: Montserrat;
  margin-top: 60px;
`

const YourBetes = ({ yourBetesData, teams, ...props }) => {
  const data = yourBetesData()
  function Body() {
    return (
      <Container isScrollable={!!(data.length > 3)}>
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
        {props.me.me && data && data.map((item, index) => (
          <div key={index}>
            <StyledRow status={item.orderType}>
              <div style={{ display: 'flex', width: '150px', alignItems: 'center' }}>
                {returnFlagUrl(teams[item.outcome], true)}
                <span>{teams[item.outcome]}</span>
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
        {!props.me.me &&
          <Message>Please log in</Message>
        }
      </Container>
    )
  }

  return (
    <Card title={'Your Orders'} width="100%">
      <Body />
    </Card>
  )
}

export default enhance(YourBetes)
