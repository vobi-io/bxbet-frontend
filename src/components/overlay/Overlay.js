import React from 'react'
import styled from 'styled-components'
import enhance from './overlayEnhancer'

import FirstLayer from './FirstLayer'
import SecondLayer from './SecondLayer'
import ThirdLayer from './ThirdLayer'
import FourthLayer from './FourthLayer'

import LogoImg from '../../resources/assets/img/bx-logo-color-horizontal.png'
import FacebookLogo from '../../resources/assets/facebook.png'
import TelegramLogo from '../../resources/assets/Telegram.png'
import TwitterLogo from '../../resources/assets/Twitter.png'
import YoutubeLogo from '../../resources/assets/Youtube.png'
import ArrowRight from '../../resources/assets/ArrowRight.png'
import ArrowLeft from '../../resources/assets/ArrowLeft.png'

const MediumLogo = () => (
  <svg enableBackground="new -91 49.217 56.693 56.693" width="35px" height="35px" id="Layer_1" version="1.1" viewBox="-91 49.217 56.693 56.693" space="preserve" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
    <path d="M-62.4995,54.3363c-13.5995,0-24.6249,11.0234-24.6249,24.623c0,13.5997,11.0254,24.625,24.6249,24.625  c13.5986,0,24.624-11.0253,24.624-24.625C-37.8755,65.3597-48.9009,54.3363-62.4995,54.3363z M-48.531,70.6566h-1.1218  c-0.4166,0-1.0054,0.6008-1.0054,0.9854v13.9409c0,0.3851,0.5889,0.91,1.0054,0.91h1.1218v3.3091h-10.1636v-3.3091h2.1273V71.8384  h-0.1042l-4.9675,17.9635h-3.846l-4.9035-17.9635h-0.1241v14.6544h2.1273v3.3091h-8.509v-3.3091h1.0895  c0.4488,0,1.0377-0.5249,1.0377-0.91V71.642c0-0.3846-0.5889-0.9854-1.0377-0.9854h-1.0895v-3.3091h10.6401l3.4934,12.9999h0.0961  l3.5257-12.9999h10.6082V70.6566z" fill="#2880e5" />
  </svg>
)

const Background = styled.div`
  background-color: rgba(216, 216, 216, 0.2);
  width: 100%;
  height: 100vh;
  position: fixed;
  z-index: 500;
  display: flex;
  justify-content: center;
`
const Container = styled.div`
  max-width: 759px;
  position: fixed;
  top: 0;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.95);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
`
const Logo = styled.img`
  width: 150px;
  margin-top: 40px;
`
const Footer = styled.div`
  margin-bottom: 20px;
  margin-top: 20px;
`
const FlexRow = styled.div`
  display: flex;
  justify-content: ${props => (props.jcenter ? 'center' : null)};
  align-items: ${props => (props.alcenter ? 'center' : null)};
  margin-top: ${props => (props.marginTop ? props.marginTop : null)}px;
`
const Circle = styled.div`
  :not(:first-child){
    margin-left: 20px;
  }
  width: 13px;
  height: 13px;
  border-radius: 50%;
  border: 1px solid #323233;
  background-color: ${props => (props.filled ? '#323233' : null)}
`
const SocialIcons = styled.img`
  width: ${props => (props.fb || props.tw ? '31' : '35')}px;
  height: ${props => (props.fb || props.tw ? '31' : '35')}px;
`
const Arrow = styled.img`
  width: 70px;
  height: 70px;
  cursor: pointer;
  position: absolute;
  top: 40%;
  left: ${props => (props.left ? '0' : null)};
  right: ${props => (props.right ? '0' : null)};
`
const Main = styled.div`
  width: 70%;
  margin-top: 10%;
`
const Anchor = styled.a`
  :not(:last-child){
    margin-right: 20px;
  }
`
const Overlay = ({ onRightClick, onLeftClick, active, acceptClick, closeOverlay }) => (
  <Background>
    <Container>
      <Logo src={LogoImg} alt="logo" />
      <FlexRow>
        {active !== 0 &&
          <Arrow src={ArrowLeft} alt="left" left onClick={() => onLeftClick()} />
        }
        {active !== 3 &&
          <Arrow src={ArrowRight} alt="right" right onClick={() => onRightClick()} />
        }
      </FlexRow>
      <Main>
        {active === 0 && <FirstLayer />}
        {active === 1 && <SecondLayer />}
        {active === 2 && <ThirdLayer />}
        {active === 3 && <FourthLayer acceptClick={acceptClick} closeOverlay={closeOverlay} />}
      </Main>
      <Footer>
        <FlexRow jcenter>
          <Circle filled={active === 0} />
          <Circle filled={active === 1} />
          <Circle filled={active === 2} />
          <Circle filled={active === 3} />
        </FlexRow>
        <FlexRow jcenter alcenter marginTop={18}>
          <Anchor href="https://www.facebook.com/BXBET/" target="_blank"><SocialIcons fb src={FacebookLogo} alt="facebook" /></Anchor>
          <Anchor href=" https://medium.com/bxbet" target="_blank"><MediumLogo /></Anchor>
          <Anchor href=" https://t.me/bxbet" target="_blank"><SocialIcons src={TelegramLogo} alt="telegram" /></Anchor>
          <Anchor href="https://youtu.be/qLY431v0vrI" target="_blank"><SocialIcons src={YoutubeLogo} alt="youtube" /></Anchor>
          <Anchor href="https://twitter.com/BXBETico" target="_blank"><SocialIcons tw src={TwitterLogo} alt="twitter" /></Anchor>
        </FlexRow>
      </Footer>
    </Container>
  </Background>
)

export default enhance(Overlay)
