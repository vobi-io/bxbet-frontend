import React from 'react'
import styled from 'styled-components'
import { slide as Menu } from 'react-burger-menu'

import burgerNavIcon from '../../resources/assets/img/icons/burger-navigation.svg'
import { SearchField } from '../form'
import InfoList from './InfoList'
import enhance from './sidebarEnhance'

const SidebarContainer = styled.div`
    width: 59px;
    height: 100vh;
    position: fixed;
    background-image: linear-gradient(179deg, #0f334b 1%, #265271);

    & button{
        width: 59px !important;
        height: 50px !important;
    }

    & .bm-menu {
    display: flex;
    justify-content: center;
    padding: 15px;
    }

    & .bm-overlay {
      top: 0
    }

    & nav.bm-item-list {
    width: 100%;
    }

    & .bm-menu-wrap{
        background-image: linear-gradient(179deg, #0f334b 1%, #265271);
        width: 315px;
    }



    & .bm-icon{
        width: 26px !important;
        height: 17px !important;
        margin-left: 15px;
        margin-top: 15px;
    }
`
const CloseButton = styled.div`
  white-space: nowrap;
  font-size: 40px;
  color: white;
  display: flex !important;
  justify-content: flex-end;
  span {
    cursor: pointer;
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

const Sidebar = ({ data, loading, isOpen, toggle }) => (
  <SidebarContainer>
    <Img src={burgerNavIcon} alt="img" onClick={() => { toggle() }} />
    <StyledMenu customBurgerIcon={false} customCrossIcon={false} isOpen={isOpen} >
      <CloseButton><span onClick={() => { toggle() }} >&times;</span></CloseButton>
      <SearchField />
      <InfoList data={data} loading={loading} />
    </StyledMenu>
  </SidebarContainer>
)

export default enhance(Sidebar)
