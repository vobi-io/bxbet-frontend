import React, { Component } from 'react'
import styled from 'styled-components'

import Card from '../card'

class Information extends Component {
  constructor(props) {
    super()
    this.state = {
      buy: props.buy,
      sell: props.sell,
    }

    this.Tables = this.Tables.bind(this)
  }

  Table(props) {
    const Container = styled.div`
      width: 243px;
      height: 415px;
      border-radius: 5px;
      background-color: #0f334b;
      box-shadow: 0px 3px 9.5px 0.5px rgba(7, 140, 255, 0.1);
      font-family: Open Sans;
      font-size: 14px;
      color: white;
      overflow: hidden;
    `

    const StyledTitle = styled.div`
      text-transform: uppercase;
      color: white;
      height: 32px;
      background-image: ${props.title === 'buy' ? 'linear-gradient(to bottom, #7fac30, #288702 99%)' : 'linear-gradient(to bottom, #ed2b3b, #9f041b);'};
      font-family: Montserrat;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 5px 5px 0 0;
    `
    const StyledSubTitle = styled.div`
      display: flex;
      padding: 20px 0;
      & > div {
        width: 100%;
        text-align: center;
      }
    `

    const StyledContent = styled.div`
      border-top: solid 1px #92acfe;

      & .rows {
        display: flex;
        border-bottom: solid 1px #92acfe;
        align-items: center;

        & .odds, & .amount {
          width: 100%;
          text-align: center;
        }
      }
    `

    const Line = styled.div`
      height: 40px;
      width: 2px;
      background-color: #92acfe;
    `

    return (
      <Container>
        <StyledTitle>{props.title}</StyledTitle>
        <StyledSubTitle>
          <div> Odds </div>
          <div> Amount </div>
        </StyledSubTitle>
        <StyledContent>
          {
            this.props.buy.map((item, index) =>
              <div className="rows" key={index}>
                <div className="odds">
                  {item[0]}
                </div>
                <Line />
                <div className="amount">
                  {item[1]}
                </div>
              </div>)
          }
        </StyledContent>
      </Container>
    )
  }

  Tables() {
    const StyledTables = styled.div`
      display: flex;
    `
    const Brick = styled.div`
      width: 12px;
    `

    return (
      <StyledTables>
        {this.Table({ title: 'buy' })}
        <Brick />
        {this.Table({ title: 'sell' })}
      </StyledTables>
    )
  }

  render() {
    return <Card title={'Information'} content={this.Tables} />
  }

}

export default Information
