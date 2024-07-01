import React from 'react'
import Login from './Login'
import { Outlet } from 'react-router-dom';
import '../style/EnteryPageStyle.css'
import '../style/login.css'
const EnteryPage = () => {
  return (
    <div className='enteryPage-background'>
      <Outlet />
    </div>
  )
}

export default EnteryPage
