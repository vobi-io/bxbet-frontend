import React from 'react'
import styled from 'styled-components'
import { slide as Menu } from 'react-burger-menu'

import burgerNavIcon from '../../resources/assets/img/icons/burger-navigation.svg'
import { SearchField } from '../form'
import InfoList from './InfoList'
import enhance from './enhance'

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

const Sidebar = ({ data, loading }) => (
  <SidebarContainer>
    <Menu customBurgerIcon={<img src={burgerNavIcon} />}>
      <SearchField />
      <InfoList data={data} loading={loading} />
    </Menu>
  </SidebarContainer>
    )

export default enhance(Sidebar)
