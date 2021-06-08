import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from '../header/NavBar'
import LandingPage from '../components/LandingPage'
import ClientsPage from '../components/ClientsPage'
import AboutPage from '../components/AboutPage'
import PostPage from "../components/PostPage"
import CardComponent from '../components/CardComponent'
import Client from '../components/Client'
import BrendPage from '../components/BrendPage'
import FadeIn from "react-fade-in";

function Layouts() {

    return (
        <Router>
            <div className="App">
                <Navbar />
                <Switch>
                    <Route path="/" exact component={LandingPage} />
                    <Route path="/about" exact render={() => <AboutPage />} />
                    <Route path="/clients" exact render={({ match }) => <ClientsPage match={match} />} />
                    <Route path="/clients/:client" exact render={({ match }) => <BrendPage match={match} />} />
                    <Route path="/clients/:client/:brend" exact render={({ match }) => <PostPage match={match} />} />
                    <Route path="/clients/:client/:brend/:brendname" exact render={({ match }) => <PostPage match={match} />} />
                </Switch>
            </div>
        </Router>

    )
}

export default Layouts