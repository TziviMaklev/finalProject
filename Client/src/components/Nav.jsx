import React from 'react';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AllUserMassege from './AllUserMassege';
import AddManeger from './AddManger';
import AllReservedAds from './AllReservedAds';


import img from '../images/profile.png';

import '../style/nav.css'
function Nav() {
    const [currentUser, setCurrentUser] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [showSignUp, setShowSighUp] = useState(false);
    const [showReservedAds, setShowReservedAds] = useState(false);

    useEffect(() => {
        if (JSON.parse(sessionStorage.getItem('currentUser')) != undefined) {
            setCurrentUser(JSON.parse(sessionStorage.getItem('currentUser')));
        }
    }, []);
    useEffect(() => {
        console.log(showMessage);
    }, [showMessage]);
    // let ko ="C:\Users\The user\Desktop\finalProject\Client\src\images\IMG_20240314_145726_808.jpg";
    console.log("nav", currentUser);
    function logOut() {
      console.log("logOut");
      sessionStorage.removeItem('currentUser');
      setCurrentUser("");
    }
    return (
        <>
 <div className='navDiv'>
      <div className="navbar-container">
        <img src={img} alt="" width={50} height={50} />
      </div>
      {currentUser !=="" ? <span className="username-placeholder">hi {currentUser.name} </span> : <span className="username-placeholder">hi Anonymous</span> }
      {currentUser !=="" &&  <button onClick={() => setShowMessage(!showMessage)} >🗨️️</button> }
      {currentUser !=="" && <button onClick={() => setShowReservedAds(!showReservedAds)}>❤️</button>}
      <div className='items'>
        {/* <NavLink className='link item businesses' exact to="/businesses">עסקים למכירה</NavLink> */}
        {/* <NavLink className='link item appliances animal' exact to="/animal">חיות</NavLink> */}
        {/* <NavLink className='link item furniture' exact to="/furniture">רהיטים</NavLink> */}
        <NavLink className='link item appliances' exact to="/appliances">מוצרי חשמל</NavLink>
        <NavLink className='link item cars' exact to="/cars">מכוניות</NavLink>
      </div>
      {currentUser !==""  ? 
      <NavLink className='logout' to="/signUp" onClick={logOut}>התנתקות</NavLink> :
       <>
       <NavLink className=' login' to="/login" >Login</NavLink>
       <NavLink className=' sighUp' to="/signUp" >SignUp</NavLink>
      </>}
      {currentUser.manger && (
        <button className="addManeger" onClick={() => setShowSighUp(!showSignUp)}>add maneger</button>
      )}
       
      </div>
      {showSignUp && <AddManeger showSignUp={showSignUp} />}
      {showMessage &&  <AllUserMassege user_id={currentUser.user_id} />}  
      {showReservedAds && <AllReservedAds user_id={currentUser.user_id}/>}  
        </>
        
    );
}

export default Nav;