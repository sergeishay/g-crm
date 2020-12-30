import React from 'react'
import '../styles/LandingPage.css'
import { Router, Route, Switch, Link } from 'react-router-dom'
import computer from '../assets/computer.png'
import people from '../assets/people.png'
function LandingPage() {
    return (
        <div className="container">
            <div className="mainEnter">
                <div className="rightSide">
                    <img className='computer' src={computer} alt="computer" />
                </div>
                <div className="center">
                    <h1 className="mainHading">GRM</h1>
                </div>
                <div className="leftSife">
                    <img className="people" src={people} alt="" />
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