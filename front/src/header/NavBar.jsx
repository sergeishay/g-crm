import React from 'react'
import {Nav , NavBtnLink , NavLink , NavMenu , NavBtn , Bars } from './NavBarElements'

const NavBar = () => {
  return (
    <>
      <Nav>
         <NavLink to="/"> 
          <h1>logo</h1>
         </NavLink>
         <Bars />
         <NavMenu>
            <NavLink to='/about' activeStyle>About</NavLink>
            <NavLink to='/contact-us' activeStyle>Contact Us</NavLink>
            <NavLink to='/' activeStyle>Home</NavLink>
            <NavLink to='/sign-up' activeStyle>sign-up</NavLink>
         </NavMenu>
         <NavBtn>
            <NavBtnLink to='/signin'>Sign In</NavBtnLink>
         </NavBtn>
      </Nav>
    </>
  )
}

export default NavBar
