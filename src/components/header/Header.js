import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import authAware from '../../authAware'
import AuthMenu from './AuthMenu'
import UserMenu from './UserMenu'

const StyledHeader = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0px 100px 0px 100px;
  // box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.27);
  background-color: white;
  width:1200px;
  height:84px;
  // border: 1px solid #CCCCCC;
`
const HeaderParent = styled.span`
  display:flex;
  flex-direction:row;
  justify-content: center;
`
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const BrandName = styled.span`
  font-size: 28px;
  font-weight: bold;
  color: #2f3033;
  font-family: Raleway;		
  line-height: 33px;

`

const Nav = styled.ul`
  list-style: none;
  margin-right: 20px;
  display: block;
  padding-left: 16px;
`

const NavItem = styled.li`
  float: left;
  padding: 22px 15px;
  color: #2F3033;
  font-family: Raleway;
  font-size: 16px;
  font-weight: 500;
  line-height: 19px;
  text-align: center;
`

const NavLink = styled(Link)`
  font-size: 16px;
  text-decoration: none;
  color: #2f3033;
  transition: 0.2s;
  &:hover {
    color: #06c953;
  }
`
const LogoLink = styled(Link)`
  text-decoration: none;
  cursor:pointer;
`

const Header = ({
  authenticated,
  brandName,
  leftPages,
  rightPages,
  toggleSignIn,
  toggleSignUp,
}) => (
  <HeaderParent>
    <StyledHeader>
      <Wrapper>
        <LogoLink to={'/'}><BrandName>{brandName}</BrandName></LogoLink>
        {leftPages &&
          <Nav>
            {leftPages.map(item => (
              <NavItem key={item.title}>
                <NavLink to={item.to}>{item.title}</NavLink>
              </NavItem>
            ))}
          </Nav>}
      </Wrapper>
      <Wrapper>
        {rightPages &&
          <Nav>
            {rightPages.map(item => (
              <NavItem key={item.title}>
                <NavLink to={item.to}>{item.title}</NavLink>
              </NavItem>
            ))}
          </Nav>}
        {authenticated && <UserMenu />}
        {!authenticated
          && <AuthMenu toggleSignUp={toggleSignUp} toggleSignIn={toggleSignIn} />}
      </Wrapper>
    </StyledHeader>
  </HeaderParent>
)

export default authAware(Header)
