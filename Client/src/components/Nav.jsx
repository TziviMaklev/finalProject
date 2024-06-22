import React from 'react';
import { Link } from 'react-router-dom';
import '../style/nav.css'

function Nav() {
    console.log("nav");
    return (
        <div className='navDiv'>
            <Link className='link home'  to="/">בית</Link>
            <Link className='link reservedAds' to="/reservedAds">מודעות שמורות</Link>
            <Link className='link addItem' to="/addItem">הוספת פריט</Link>
            <Link className='link exit' to="/sighUp">הרשמה</Link>
            <Link className='link enter' to="/login">התחברות</Link>
        </div>
    );
}

export default Nav;