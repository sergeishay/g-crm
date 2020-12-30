import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from '../header/NavBar'
import LandingPage from '../components/LandingPage'
import ClientPage from './ClientsPage'
import AboutPage from './AboutPage'


function Layouts() {

    return (
        <Router>
            <div className="App">
                <Navbar />
                <Switch>
                    <Route path="/" exact component={LandingPage} />
                    <Route path="/about" exact render={() => <AboutPage />} />
                    <Route path="/clients" exact render={({ match }) => <ClientPage match={match} />} />
                </Switch>
            </div>
        </Router>

    )
}

export default Layouts