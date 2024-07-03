import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link, Navigate ,  } from 'react-router-dom';
import './App.css'
import Login from './components/Login.jsx'
import SignUp from './components/SighUp.jsx'
// import AllReservedAds from './components/reservedAds/AllReservedAds.jsx'
import HomePage from './components/HomePage.jsx'
import Nav from './components/Nav.jsx'
import AddManeger from './components/AddManger';
import Cars from './components/cars/Cars.jsx'
import Appliances from './components/appliance/Appliances.jsx'
import EnteryPage from './components/EnteryPage.jsx';
import ReservedAdsList from './components/reservedAds/ReservedAdsList.jsx'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<EnteryPage />}>
          <Route path='login' element={<Login />} />
          <Route path='signUp' element={<SignUp />} />
        </Route>
        <Route path='' element={<Nav />}>
        <Route path='reservedAds/:id' element={<ReservedAdsList />} ></Route>
        <Route path='appliances' element={<Appliances />} />
        <Route path='maneger/add' element={<AddManeger />} />
        <Route path='homePage/:id' element={<HomePage />}>
        </Route>

        <Route path='cars' element={<Cars />} ></Route>
        </Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
