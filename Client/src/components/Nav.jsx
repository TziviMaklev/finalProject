import React from 'react';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AllUserMassege from './AllUserMassege';
import AddManeger from './AddManger';

import img from '../images/profile.png';

import '../style/nav.css'
function Nav() {
    const [currentUser, setCurrentUser] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [showSignUp, setShowSighUp] = useState(false);
    useEffect(() => {
        if (JSON.parse(sessionStorage.getItem('currentUser')) != undefined) {
            setCurrentUser(JSON.parse(sessionStorage.getItem('currentUser')));
        }
    }, []);
    useEffect(() => {
        console.log(showMessage);
    }, [showMessage]);

    console.log("nav", currentUser);
    return (
        <>
            <div className='navDiv'>
                <div class="navbar-container">
                    <div class="navbar-profile">
                        <img src="C:\Users\The user\Desktop\finalProject\Client\src\images\IMG_20240314_145726_808.jpg" alt="" srcset="" />
                        <span class="username-placeholder">{currentUser.name} </span>
                    </div>
                </div>
                <button onClick={() => setShowMessage(!showMessage)}>🗑️</button>
                <div className='items'>
                    <NavLink className='link item businesses' exact to="/businesses">עסקים למכירה</NavLink>
                    <NavLink className='link item appliances animal' exact to="/animal">חיות</NavLink>
                    <NavLink className='link item furniture' exact to="/furniture">רהיטים</NavLink>
                    <NavLink className='link item appliances' exact to="/appliances">מוצרי חשמל</NavLink>
                    <NavLink className='link item cars' exact to="/cars">מכוניות</NavLink>
                </div>
                <NavLink className='link sighUp' to="/sighUp">התנתקות</NavLink>
                {currentUser.manger == true  && <button onClick={() => setShowSighUp(!showSignUp)}>add maneger</button>}
            </div>
            {/* {currentUser.manger == true && <button onClick={() => setShowSighUp(!showSignUp)}>add maneger</button>} */}
            { showSignUp  && <AddManeger showSignUp={showSignUp} />}
            {showMessage && <AllUserMassege user_id={currentUser.user_id} />}

        </>
        
    );
}

export default Nav;