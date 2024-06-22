import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';

import './App.css'
import Login from './components/Login.jsx'
import SighUp from './components/SighUp.jsx'
import ReservedAds from './components/ReservedAds.jsx'
import HomePage from './components/HomePage.jsx'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' >
            <Route path='home' element={<HomePage />}></Route>
            <Route path='login' element={<Login />} />
            <Route path='sighUp' element={<SighUp />} />
            <Route path='reservedAds' element={<ReservedAds />} />
          </Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
