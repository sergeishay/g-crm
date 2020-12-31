// import './App.css';
import React , {Component} from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { useState, useEffect } from 'react'
import LandingPage from './components/LandingPage'
import Navbar from './header/NavBar'
import Layouts from './components/Layout';

function App() {
  return (
    <div  className='mainApp'>
        <Layouts />
    </div>
  );
}

export default App;
