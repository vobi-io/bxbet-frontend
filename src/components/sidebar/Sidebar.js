import React from 'react'
import styled from 'styled-components'
import { slide as Menu } from 'react-burger-menu'

import burgerNavIcon from '../../resources/assets/img/icons/burger-navigation.svg'
import { SearchField } from '../form'
import InfoList from './InfoList'

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

const showSettings = (e) => {
  console.log(e)
}

const data = [
  {
    status: 'In Progress',
    countryOne: 'Argentina',
    countryTwo: 'Iceland',
    time: '14/05 15:00',
  },
  {
    status: 'In Progress',
    countryOne: 'Argentina',
    countryTwo: 'Iceland',
    time: '14/05 15:00',
  },
  {
    status: 'Done',
    countryOne: 'Argentina',
    countryTwo: 'Iceland',
    time: '14/05 15:00',
  },
]

const Sidebar = () => (
  <SidebarContainer>
    <Menu customBurgerIcon={<img src={burgerNavIcon} />}>
      <SearchField />
      <InfoList data={data} />
    </Menu>
  </SidebarContainer>
    )

export default Sidebar
