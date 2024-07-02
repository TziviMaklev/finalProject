import React, { useEffect, useState } from 'react';
// import { NavLink } from 'react-router-dom';
import AllUserMassege from '../components/massage/AllUserMassege';
import img from '../images/profile.png';
import reserved_ads from '../images/reserved_ads.png';
import AddManeger from './AddManger';
import heart from '../images/heart1.png';
import {NavLink, useNavigate , Outlet} from 'react-router-dom';

import '../style/nav.css';
function Nav() {
    const [currentUser, setCurrentUser] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [showSignUp, setShowSighUp] = useState(false);
    const [adsArr, setAdsArr] = useState([]);
    const navigate = useNavigate();
    // const [carArr, setCarArr] = useState([]);
    // const [applianceArr, setApplianceArr] = useState([])

    useEffect(() => {
        if (JSON.parse(sessionStorage.getItem('currentUser')) != undefined) {
            setCurrentUser(JSON.parse(sessionStorage.getItem('currentUser')));
        }
    }, []);
    console.log(currentUser.user_id);
    useEffect(() => {
        console.log(showMessage);
    }, [showMessage]);
  //   useEffect(() => {
  //     const fetchData = async () => {
  //         try {
  //             const response = await fetch(`http://localhost:3300/api/user/reservedAds/${user_id}`, {
  //                 method: 'GET',
  //                 headers: {
  //                     'Content-Type': 'application/json; charset=UTF-8',
  //                 },
  //             });
  //             if (!response.ok) {
  //                 const errorResponse = await response.json();
  //                 throw new Error(errorResponse.error || 'Network response was not ok');
  //             }
  //             const data = await response.json();
  //             console.log(data[0]   );
  //             console.log(data[1]);
  //           //   setCarArr(data[0]);
  //           //   setApplianceArr(data[1]);
  //             adsArr(data[0] + data[1]);

  //         } catch (e) {
  //             console.log(e);
  //         }
  //     };

  //     fetchData(); // Call the function inside useEffect
  // }, []);
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
      <div className='items'>
        <NavLink className='link item appliances' exact to="/appliances">appliances</NavLink>
        <NavLink className='link item cars' exact to="/cars">cars</NavLink>
      </div>
      {currentUser !=="" &&  <button className='massageB' onClick={() => setShowMessage(!showMessage)} >
        <img src={reserved_ads} width={30} height={30}></img></button> }
       {currentUser !==""  && <button className='reserved_ads' onClick={()=> navigate(`/reservedAds/${currentUser.user_id}`)}><img src={heart} width={30} height={30}></img></button>}
      {/* {currentUser !=="" && <button   className='reserved_ads' 
      onClick={() => setShowReservedAds(!showReservedAds)}></button>} */}
      {currentUser !==""  ? 
      <NavLink className='logout' to="/signUp" onClick={logOut}>logOut</NavLink> :
       <>
       <NavLink className=' login' to="/login" >Login</NavLink>
       <NavLink className=' sighUp' to="/signUp" >SignUp</NavLink>
      </>}
      {currentUser.manger && (
        // <button className="addManeger" onClick={() => setShowSighUp(!showSignUp)}>add maneger</button>
        <button className="addManeger" onClick={() => navigate(`/maneger/add`)}>add maneger</button>

      )}
       
      </div>
      {/* {showSignUp && <AddManeger showSignUp={showSignUp} />} */}
      {showMessage &&  <AllUserMassege user_id={currentUser.user_id} />}  
      <Outlet/>
        </>
        
    );
}

export default Nav;