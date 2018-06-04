/* eslint no-undef:0 */
import React from 'react'
import { graphql } from 'react-apollo'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { compose, withHandlers, withProps, branch, renderNothing } from 'recompose'
import { Button } from 'vobi-components'

import { clearToken } from '../../services/auth'
import meQuery from '../../graphql/Me.graphql'
import BellIcon from './BellIcon'
import ChatIcon from './ChatIcon'
import UserIcon from './UserIcon'

const StyledUserMenu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 0px;
`

const AvatarContainer = styled.div`
  margin-right: 16px;
  position: relative;
  :before {
    content: ' ';
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 6px 4px 0 4px;
    border-color: #615b57 transparent transparent transparent;
    position: absolute;
    right: 0px;
    top: 15px;
  }
  &:hover:before {
    border-color: #06c953 transparent transparent transparent;
  }
  &:hover ~ .dropDownTmpClass{
    display:block;
  }
  width: 52px;
  cursor:pointer;
  
`
const Avatar = styled.img`
  width: 37px;
  height: 37px;
  border-radius: 50%;
`
const IconAvatar = styled.div`
  border-radius: 50%;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Icon = styled.div`
  margin-right: 15px;
  svg {
    fill: ${(props) => {
      if (props.primary) return '#007bff'
      else if (props.green) return '#07730D'
      else if (props.red) return '#dc3545'
      else if (props.gray) return '#2F3033'
      return '#2F3033'
    }};
  }
`
const UserDropDown = styled.div.attrs({
  className: 'dropDownTmpClass',
})`
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 2;
    margin-top: 95px;
    margin-left: -11px;
    &:hover {
      display:block;
    }
`
const ProfileMenu = styled.div`
    height: 50px;
    justify-content: center;
    display: flex;
    flex-direction: column;
    text-align:center;
    font-family: "Proxima Nova";
    cursor:pointer;
    &:hover {
      background: #F2F2F2
    }
`
const styles={
  userIcon:{
    marginRight: '0px',
    marginLeft: '2px',
    marginBottom: '5px',
    padding: '0px',
  }
}
const UserMenu = ({email, signOut }) => (
  <StyledUserMenu>
    <Icon >
      <ChatIcon gray/>
    </Icon>
    <Icon green>
      <BellIcon />
    </Icon>
    <AvatarContainer>
      {/* <Avatar
        src="https://www.hellomagazine.com/imagenes/celebrities/2017101143124/angelina-jolie-womens-rights-harpers-bazaar/0-220-355/angelina-jolie-womens-rights-t.jpg"
        alt={email}
      /> */}
      <IconAvatar>
        <Icon style={styles.userIcon}>
          <i style={{fontSize:'24px'}} className="far fa-user"></i>
        </Icon>
     </IconAvatar>
    </AvatarContainer>
    <UserDropDown >
        <ProfileMenu>Profile</ProfileMenu>
        <ProfileMenu>Settings</ProfileMenu>
        <ProfileMenu onClick={signOut}>Logout</ProfileMenu>
    </UserDropDown>
   

    {/* <ul>
      <li>
        <Link to="/">Hello, {email}</Link>
      </li>
      <li>
        <Button type="button" onClick={signOut}>
          Sign out
        </Button>
      </li>
    </ul> */}
  </StyledUserMenu>
)

export default compose(
  withHandlers({
    signOut: () => async (e) => {
      e.preventDefault()
      clearToken()
      window.location.href = '/'
    },
  }),
  graphql(meQuery, { options: { fetchPolicy: 'network-only' }, name: 'me' }),
  withProps(({ me }) => ({
    ...me.me,
  })),
  branch(({ me }) => me && me.loading, renderNothing)
)(UserMenu)
