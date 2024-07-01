import React from 'react'
import Nav from './Nav';

import { Outlet } from 'react-router-dom';
import '../style/EnteryPageStyle.css'
import '../style/login.css'
const EnteryPage = () => {
  return (
    <div className='enteryPage-background'>
     <Nav/>
      <Outlet />
    </div>
  )
}

export default EnteryPage
