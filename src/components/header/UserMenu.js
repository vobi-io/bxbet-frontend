/* eslint no-undef:0 */
import React from 'react'
import { graphql } from 'react-apollo'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { compose, withHandlers, withProps, branch, renderNothing } from 'recompose'
import { Button } from 'vobi-components'
import { withMe, listenerOn } from '../../hocs'

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
  display: flex;
  align-items: center;
  ::after {
    content: ' ';
    border-style: solid;
    border-width: 6px 4px 0 4px;
    border-color: #355163 transparent transparent transparent;
    margin-left: 12px;
  }
  &:hover:before {
    border-color: #06c953 transparent transparent transparent;
  }
  &:hover ~ .dropDownTmpClass {
    display: block;
  }
  cursor: pointer;
`
const Avatar = styled.img`
  width: 37px;
  height: 37px;
  border-radius: 50%;
  margin-right: 14px;
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
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 2;
  margin-top: 42px;
  margin-left: -11px;
  &:hover {
    display: block;
  }
`
const ProfileMenu = styled.div`
  height: 50px;
  justify-content: center;
  display: flex;
  flex-direction: column;
  text-align: center;
  font-family: 'Proxima Nova';
  cursor: pointer;
  &:hover {
    background: #f2f2f2;
  }
`
const Balance = styled.div`
  font-family: Open Sans;
  font-size: 14px;
  color: #183f5a;
  display: flex;
  margin-right: 24px;
  display: flex;
  align-items: center;
`

const styles = {
  userIcon: {
    marginRight: '0px',
    marginLeft: '2px',
    marginBottom: '5px',
    padding: '0px',
  },
  balance: {
    fontWeight: 'bold',
    marginRight: '8px',
  },
  balanceCounter: {
    fontFamily: 'Montserrat',
    fontSize: '18px',
    color: '#078cff',
    marginRight: '16px',
  },
  deviderLine: {
    width: '1px',
    height: '24px',
    opacity: '0.5',
    backgroundColor: '#0f334b',
  },
  username: {
    fontFamily: 'Montserrat',
    fontSize: '14px',
    color: '#355163',
    textTransform: 'uppercase',
  },
}

const UserMenu = ({ email, signOut, balanceCounter, userImageUrl }) => (
  <StyledUserMenu>
    <Balance>
      <p style={styles.balance}> Balance: </p>
      <p style={styles.balanceCounter}>{balanceCounter} BX</p>
      <div style={styles.deviderLine} />
    </Balance>
    <AvatarContainer>
      {userImageUrl ? <Avatar src={userImageUrl} alt={email} /> : <UserIcon />}

      {/* <IconAvatar>
        <Icon style={styles.userIcon}>
          <i style={{ fontSize: '24px' }} className="far fa-user" />
        </Icon>
      </IconAvatar> */}
      <p style={styles.username}>{email}</p>
    </AvatarContainer>
    <UserDropDown>
      {/* <ProfileMenu>Profile</ProfileMenu>
      <ProfileMenu>Settings</ProfileMenu> */}
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
  withMe(),
)(UserMenu)
