import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link, Navigate ,  } from 'react-router-dom';
import './App.css'
import Login from './components/Login.jsx'
import SignUp from './components/SighUp.jsx'
import ReservedAds from './components/reservedAds/ReservedAds.jsx'
import HomePage from './components/HomePage.jsx'
// import Animals from './components/Animals.jsx'
// import Furniture from './components/Furniture.jsx'
import Cars from './components/cars/Cars.jsx'
// import Businesses from './components/Businesses.jsx'
import Appliances from './components/appliance/Appliances.jsx'
import EnteryPage from './components/EnteryPage.jsx';



function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<EnteryPage />}>
          <Route path='login' element={<Login />} />
          <Route path='signUp' element={<SignUp />} />
        </Route>
          <Route path='homePage/:id' element={<HomePage />}>
          </Route>
          {/* <Route path='login' element={<Login />} />
          <Route path='signUp' element={<SignUp />} /> */}
          <Route path='reservedAds' element={<ReservedAds />} />
          {/* <Route path='animal' element={<Animals />} /> */}
          {/* <Route path='furniture' element={<Furniture />} /> */}
          <Route path='cars' element={<Cars />} />
          {/* <Route path='businesses' element={<Businesses />} /> */}
          <Route path='appliances' element={<Appliances />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
