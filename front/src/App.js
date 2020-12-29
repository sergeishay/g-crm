import './App.css';
import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import NavBar from './header/NavBar'
import LandingPage from './components/LandingPage'

function App() {
  return (
    <div className="App">
        <NavBar />
        <LandingPage />
    </div>
  );
}

export default App;
