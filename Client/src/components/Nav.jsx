import React from 'react';
import { Link } from 'react-router-dom';
import '../style/nav.css'

function Nav(props) {
    const status = props.status == "notLayote" ? false  : true;
    console.log("nav");
    return (
        <div className='navDiv'>
            <Link className='link home' exact to="/homePage">בית</Link>
            {status && <Link className='link reservedAds' exact to="/reservedAds">מודעות שמורות</Link>}
            {status && <Link className='link addItem' exact to="/addItem">הוספת פריט</Link> }
            <Link className='link exit'  exact to="/sighUp">הרשמה</Link>
            <Link className='link enter'exact to="/login">התחברות</Link>
        </div>
    );
}

export default Nav;