import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import authAware from '../../authAware'
import AuthMenu from './AuthMenu'
import UserMenu from './UserMenu'
import Logo from '../../resources/assets/img/bx-logo-color-horizontal.png'

const StyledHeader = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0px 26px;
  // box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.27);
  background-color: white;
  width: 100%;
  height:57px;
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
  font-family: Montserrat;		
  line-height: 33px;
`

const Nav = styled.ul`
  list-style: none;
  margin-right: 20px;
  display: block;
  padding-left: 16px;
`

const NavItem = styled.li`
  display: flex;
  float: left;
  padding: 22px 0 16px 16px;
  color: #0f334b;
  font-family: Montserrat;
  font-size: 18px;
  line-height: 19px;
  text-align: center;
  opacity: 0.7;
  text-transform: uppercase;
  border-bottom: ${props => props.isActive ? '3px solid #0f334b' : 'none'};
`

const NavCircle = styled.div`
  margin-left: 15px;
  width: 4px;
  height: 4px;
  border-radius: 2px;
  background-color: #758590;
  display: inline-block;
  align-self: center;
`

const NavLink = styled(Link)`
  font-size: 16px;
  text-decoration: none;
  color: #2f3033;
  transition: 0.2s;
  &:hover {
    opacity: 1;
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
  centeredPages,
  toggleSignIn,
  toggleSignUp,
  location,
}) => (
  <HeaderParent>
    <StyledHeader>
      <Wrapper>
        <LogoLink to={'/'}>
          <img src={Logo} alt="Logo" style={{ width: '132px' }} />
        </LogoLink>
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
        {centeredPages &&
          <Nav>
            {centeredPages.map((item, index, fullObj) => (
              <NavItem key={item.title} isActive={item.to === location.pathname}>
                <NavLink to={item.to}>{item.title}</NavLink>
                {
                  index < fullObj.length - 1 ? <NavCircle /> : null
                }
              </NavItem>
            ))}
          </Nav>}
      </Wrapper>
      <Wrapper>
        {authenticated && <UserMenu balanceCounter={1550} username={'Mrs. Jolie'} />}
        {!authenticated
          && <AuthMenu toggleSignUp={toggleSignUp} toggleSignIn={toggleSignIn} />}
      </Wrapper>
    </StyledHeader>
  </HeaderParent>
)

export default authAware(Header)
