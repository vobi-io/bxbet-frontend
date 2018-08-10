import React from 'react'
import styled from 'styled-components'
import { slide as Menu } from 'react-burger-menu'

import burgerNavIcon from '../../resources/assets/img/icons/burger-navigation.svg'
import { SearchField } from '../form'
import enhance from './sidebarEnhance'
import GroupedItems from './GroupedItems'
import bxLogo from '../../resources/assets/img/bxbetlogoSidebar.png'

const SidebarContainer = styled.div`
  @media only screen and (max-width: 1024px) {
    width: 7%;
  }
  @media only screen and (max-width: 500px) {
    width: 17.69%;
  }
    height: 100vh;
    position: fixed;
    background-color: #122d3e;
    z-index: 1;

    & button{
        width: 59px !important;
        height: 50px !important;
    }

    & .bm-menu {
    display: flex;
    justify-content: center;
    padding: 15px;
    background-color: #122d3e;
    }

    & .bm-overlay {
      top: 0;
      display: none;
      @media only screen and (max-width: 1024px) {
        display: block;
      }
    }

    & nav.bm-item-list {
    width: 100%;
    }

    & .bm-menu-wrap{
        width: 20% !important;
        @media only screen and (max-width: 1024px) {
          width: 35% !important;
        }
        @media only screen and (max-width: 500px) {
          width: 250px !important;
        }
    }



    & .bm-icon{
        width: 26px !important;
        height: 17px !important;
        margin-left: 15px;
        margin-top: 15px;
    }
`

const StyledMenu = styled(Menu)`
  height: 100vh !important;
  top: 0;
`
const Img = styled.img`
  width: 26px;
  position: absolute;
  top: 20px;
  left: 15px;
  cursor: pointer;
`
const Div = styled.div`
  position: relative;
  @media only screen and (max-height: 1200px) {
    min-height: 90%;
  }
  @media only screen and (max-height: 700px) {
    min-height: 85%;
  }
  padding-bottom: 30px;
  margin-bottom: 8px;
`
const Logo = styled.img`
  position: absolute;
  bottom: 0;
  width: 70px;
`
const Title = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #ffffff;
  font-family: Montserrat;
`
const SearchContainer = styled.div`
  height: 60px;
  background-color: #091f2d;
  position: relative;
  margin-left: -15px;
  margin-top: -15px;
  width: 100%;
  display: flex !important;
  align-items: center;
  margin-bottom: 29px;
  padding: 0px 15px;
`
const Close = styled.span`
  color: #ffffff;
  font-size: 35px;
  cursor: pointer;
`

const Sidebar = ({ loading, isOpen, toggle, onChangeHandler, newData, value, clearOnClick, width }) => (
  <SidebarContainer>
    <Img src={burgerNavIcon} alt="img" onClick={() => { toggle() }} />
    <StyledMenu customBurgerIcon={false} customCrossIcon={false} isOpen={width > 1024 ? true : isOpen} >
      <SearchContainer>
        <Close onClick={() => clearOnClick()} >&times;</Close>
        <SearchField value={value} onChange={onChangeHandler} />
      </SearchContainer>
      <Div>
        <Title>Football</Title>
        <GroupedItems data={newData} loading={loading} />
        <Logo src={bxLogo} alt="logo" style={{ position: 'absolute', bottom: 0 }} />
      </Div>
    </StyledMenu>
  </SidebarContainer>
)

export default enhance(Sidebar)
