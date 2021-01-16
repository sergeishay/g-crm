import React from 'react'
import '../styles/LandingPage.css'
import { Router, Route, Switch, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from '../../node_modules/axios';
import computer from '../assets/computer.png'
import people from '../assets/people.png'
import mainPage from '../assets/hello.png'
import social3 from '../assets/as.png'
import ClientsPage from './ClientsPage'


function LandingPage() {


    return (
        <div className="container">
            <div className="mainEnter">
                <div className="mainPageImgDiv">
                    <img className="mainPageImg" src={mainPage} alt="" />
                </div>
                <div className='socialImgDiv'>
                    <img className="socialImg" src={social3} alt="" />
                </div>
            </div>


            <div className='readMore'>
                <div className="maybeform">
                    <Link to='/clients'><button className="clientBtn">Take Me To Client Page</button></Link>
                </div>
            </div>

        </div>
    )
}

export default LandingPage


