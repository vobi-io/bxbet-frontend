import React from 'react'
import styled from 'styled-components'

import Card from '../card'

const YourBetes = (props) => {
  function Body() {
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
      color: ${props => props.status === 'Sell' ? '#cc3c40' : '#fff'};
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
        {props.data.map((row, index) => (
          <div key={index}>
            <StyledRow status={row[2]}>
              <div>
                <img src={row[0]} alt="flag" className="flag" />
                {row[1]}
              </div>
              <div className="rigth-side">
                <div>{row[2]}</div>
                <div>{row[3]}</div>
                <div>{row[4]}</div>
                <div>{row[5]}</div>
              </div>
            </StyledRow>
            <Line />
          </div>
          ))}
      </Container>

    )
  }

  return <Card title={'Your Betes'} content={Body} width="850px" />
}

export default YourBetes
