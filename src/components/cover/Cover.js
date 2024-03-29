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
  `
  const LeftSide = styled.div`
    width: 50%;
  `
  const RightSide = styled.div`
    width: 50%;
    height: 50px;
  `
  const DateContainer = styled.div`
    display: flex;
    color: #6e7e8a;
    font-size: 14px;
    font-weight: 520;
  `
  const FlexRow = styled.div`
    display: flex;
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
  `
  const Span = styled.span`
    margin-left: 5px;
    margin-right: 10px;
  `
  const Img = styled.img`
    margin-top: -95px;
    margin-left: 12px;
  `
  const dateFormater = (timestamp) => {
    const date = new Date()

    const day = date.getDay(timestamp)
    const month = date.getMonth(timestamp)
    const year = date.getFullYear(timestamp)

    const Text = `${day}/${month}/${year}`

    return Text
  }
  const timeFormater = (timestamp) => {
    const date = new Date()
    const hour = date.getHours(timestamp)
    const minute = date.getMinutes(timestamp)
    const Text = `${hour}:${minute}`
    return Text
  }

  return (
    <StyledCover>
      <LeftSide>
        <FlexRow>
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
