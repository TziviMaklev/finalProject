import React, { useEffect, useState } from 'react';
// import { NavLink } from 'react-router-dom';
import AllUserMassege from '../components/massage/AllUserMassege';
import profile from '../images/logo.png';
import reserved_ads from '../images/reserved_ads.png';
import AddManeger from './AddManger';
import heart from '../images/heart1.png';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import send from '../images/send.png'

import '../style/nav.css';
function Nav() {
  const [currentUser, setCurrentUser] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [showImageInpute, setShowImageInpute] = useState(false);
  const [profileI, setProfileI] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  // const [profileI ,profileI] = 
  const [adsArr, setAdsArr] = useState([]);
  let userId;
  const navigate = useNavigate();
  useEffect(() => {
    if (JSON.parse(sessionStorage.getItem('currentUser')) != undefined) {
      setCurrentUser(JSON.parse(sessionStorage.getItem('currentUser')));
      userId = JSON.parse(sessionStorage.getItem('currentUser')).user_id;

    }
  }, []);
  console.log(currentUser.user_id);
  
    useEffect(() => {
      async function getProfile(id) {
        console.log(id);
        try {
          const response = await fetch(`http://localhost:3300/api/profile/${userId}`, {
            method: 'GET',
          });
          if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.error || 'Network response was not ok');
          }
          else {
            const data = await response.json();
            console.log(data);
            setProfileI(`data:image/png;base64,${data.imageData}`);
          }

        } catch (err) {
          console.log(err);
        }
      }
      if (userId != undefined) {
      getProfile(currentUser.user_id)
      }
    }, [currentUser]);
  
  function logOut() {
    console.log("logOut");
    sessionStorage.removeItem('currentUser');
    setCurrentUser("");
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file.type !== "image/png") {
      alert('Please select a image file');
      return;
    }
    setSelectedImage(file);
  };

  async function saveProfile() {
    const fileData = new FormData();
    fileData.append('image', selectedImage);
    fileData.append('user_id', `${currentUser.user_id}`);
    // Add other data as needed
    try {
      const response = await fetch(`http://localhost:3300/api/profile/`, {
        method: 'POST',
        body: fileData,
      });
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || 'Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      setShowImageInpute(!showImageInpute);
      setProfileI(`data:image/png;base64,${data.imageData}`);

    } catch (err) {
      console.log(err);

    }
    console.log("aadCar added");
  }


  return (
    <>
      <div className='navDiv'>
        <div className="navbar-container">
          {profileI != "" && <img src={profileI} alt="" width={50} height={50} onClick={() => setShowImageInpute(!showImageInpute)} />}
          {profileI === "" && <img src={profile} alt="" width={50} height={50} onClick={() => setShowImageInpute(!showImageInpute)} />}

          {showImageInpute && <> <input id="file-upload" type="file" accept="image/jpeg, image/png, image/gif" onChange={handleFileChange} name="images[]" />
            <button className='buttonAction' onClick={saveProfile}>
              <img src={send} width={15} height={15}></img></button>
          </>
          }
        </div>
        {currentUser !== "" ? <span className="username-placeholder">hi {currentUser.name} </span> : <span className="username-placeholder">hi Anonymous</span>}
        <div className='items'>
          <NavLink className='link item appliances' exact to="/appliances">appliances</NavLink>
          <NavLink className='link item cars' exact to="/cars">cars</NavLink>
        </div>
        {currentUser !== "" && <button className='massageB' onClick={() => setShowMessage(!showMessage)} >
          <img src={reserved_ads} width={30} height={30}></img></button>}
        {currentUser !== "" && <button className='reserved_ads' onClick={() => navigate(`/reservedAds/${currentUser.user_id}`)}><img src={heart} width={30} height={30}></img></button>}
        {/* {currentUser !=="" && <button   className='reserved_ads' 
      onClick={() => setShowReservedAds(!showReservedAds)}></button>} */}
        {currentUser !== "" ?
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
      {showMessage && <AllUserMassege user_id={currentUser.user_id} />}
      <Outlet />
    </>

  );
}

export default Nav;