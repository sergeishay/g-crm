import React from 'react'
import styled from 'styled-components'
import {NavLink as Link} from 'react-router-dom'
import {FaBars} from 'react-icons/fa'
 

export const Nav = styled.nav`
background : #9f5f80; 
height : 80px ; 
display : flex;
justify-content : space-between ; 
padding : 0.5rem; calc((100vw - 1000px)/2);
z-index : 10;
shadow:1px black;
`

export const NavLink = styled(Link)`
color:#fff;
display:flex;
align-items:center;
text-decoration:none;
font-size:1.5rem;
padding:0 1rem ;
height:100%;
cursor:pointer;

&.active{
    color : #ff8e71;
}
`

export const Bars = styled(FaBars)`
display:none; 
color:#fff;

@media screen and  (max-width : 768px){
    display : block;
    position : absolute;
    top:0;
    right:0;
    transform:transalate(-100% ,75%);
    font-size:1.8rem;
    cursor:pointer;
}
`

export const NavMenu = styled.div`
display : flex;
align-items:center;
margin-right:-24px;
@media screen and (max-width:768px){
    display:none;
}
`

export const NavBtn = styled.nav`
display:flex;
align-items:center;
margin-right:24px;

@media screen and (max-width:768px){
    display:none;
}
`

export const NavBtnLink =styled(Link)`
border-radius:4px;
background:#ff8e71;
padding:10px 22px;
color:#fff;
border:none;
outline:none;
cursor:pointer;
transition:all 0.2s ease-in-out;
text-decoration:none;

&:hover{
    transition:all 0.2s ease-in-out;
    background:#fff;
    color:#010606;
}
`