import React from 'react'
import styled from 'styled-components'

const StyledAuthMenu = styled.ul`
  list-style: none;
  margin-right: 20px;
  display: block;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 0px;
  margin-right: 0;
  padding: 0;
`

const NavLink = styled.a`
  font-size: 16px;
  text-decoration: none;
  color: #2f3033;
  transition: 0.2s;
  cursor: pointer;
  &:hover {
    color: #32b6ff;
  }
`

const NavItem = styled.li`
  float: left;
  padding: 22px 15px;
  font-family: Montserrat;
`

const NavItemRegister = styled(NavItem)`
  padding-right: 0;
`

const Register = styled(NavLink)`
  border: 2px solid #2F3033;
  padding: 6px 20px;
  font-family: Montserrat;
  font-size: 14px;
  font-weight: bold;
  line-height: 18px;
  text-align: center;
  
  &:hover {
    color: #32b6ff;
    border-color: #32b6ff;
  }
`

const AuthMenu = ({ toggleSignIn, toggleSignUp }) => (
  <StyledAuthMenu>
    <NavItem>
      <NavLink
        onClick={(e) => {
          e.preventDefault()
          toggleSignIn()
        }}
      >
        Log In
      </NavLink>
    </NavItem>
    <NavItemRegister>
      <Register
        onClick={(e) => {
          e.preventDefault()
          toggleSignUp()
        }}
      >
        SIGN UP
      </Register>
    </NavItemRegister>
  </StyledAuthMenu>
)

export default AuthMenu
