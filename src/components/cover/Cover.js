import React from 'react'
import styled from 'styled-components'
import HeroImg from '../../resources/assets/img/hero2.png'
// import TimeIcon from '../../resources/assets/img/time-icon.svg'
// import DateIcon from '../../resources/assets/img/date-icon.svg'

import DateIcon from './DateIcon'
import TimeIcon from './TimeIcon'

function Cover(props) {
  const StyledCover = styled.div`
    width: 100%;
    margin-top: 25px;
    box-sizing: border-box;
    border-radius: 5px;
    display: flex;
    font-family: Montserrat;
    font-size: 29px;
    text-transform: uppercase;
    color: #ffffff;
    @media only screen and (max-width: 500px) {
      justify-content: center;
    }
  `
  const LeftSide = styled.div`
    width: 50%;
  `
  const RightSide = styled.div`
    width: 50%;
    height: 50px;
    @media only screen and (max-width: 690px) {
      display: none;
    }
  `
  const DateContainer = styled.div`
    display: flex;
    color: #6e7e8a;
    font-size: 14px;
    font-weight: 520;
  `
  const FlexRow = styled.div`
    display: flex;
    @media only screen and (max-width: 500px) {
      flex-direction: ${props => (props.teams && 'column')};
      align-items: ${props => (props.teams && 'center')};
    }
  `
  const VSContainer = styled.div` 
    height: 50px;
    min-width: 50px;
    border-radius: 50%;
    background-color: #122d3e;
    color: #6e7e8a;
    margin-top: -6px;
    margin-left: 10px;
    margin-right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 22px;
    @media only screen and (max-width: 500px) {
      width: 40px;
      margin-bottom: 10px;
      margin-top: 10px;
    }
  `
  const Span = styled.span`
    margin-left: 5px;
    margin-right: 10px;
  `
  const Img = styled.img`
    margin-top: -95px;
    margin-left: 12px;
    @media only screen and (max-width: 1024px) {
      margin-left: -27px;
    }
    @media only screen and (max-width: 768px) {
      margin-left: -55px;
    }
  `
  const dateFormater = (timestamp) => {
    const date = new Date(timestamp * 1000)

    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    const Text = `${day}/${month}/${year}`

    return Text
  }
  const timeFormater = (timestamp) => {
    const date = new Date(timestamp * 1000)
    const hour = date.getHours()
    const minute = date.getMinutes()
    const Text = `${hour}:${minute}`
    return Text
  }

  return (
    <StyledCover>
      <LeftSide>
        <FlexRow teams>
          <span>{props.homeTeam}</span>
          <VSContainer><span>VS</span></VSContainer>
          <span>{props.awayTeam}</span>
        </FlexRow>
        <DateContainer>
          <FlexRow style={{ alignItems: 'center' }}>
            <DateIcon />
            <Span>{dateFormater(props.date)}</Span>
            <TimeIcon />
            <Span>{timeFormater(props.date)}</Span>
          </FlexRow>
        </DateContainer>
      </LeftSide>
      <RightSide>
        <Img src={HeroImg} alt="hero" />
      </RightSide>
    </StyledCover>
  )
}

export default Cover
