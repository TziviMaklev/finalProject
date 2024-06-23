import React from 'react';
import { NavLink } from 'react-router-dom';
import '../style/nav.css'

function Nav() {
    console.log("nav");
    return (
        <div className='navDiv'>
            <NavLink className='link home' to="/homePage">בית</NavLink>
            {/* <Link className='link reservedAds' to="/reservedAds">מודעות שמורות</Link>
            <Link className='link addItem' to="/addItem">הוספת פריט</Link> */}
            <div className='items'>
                <NavLink className='link item businesses' exact to="/businesses">עסקים למכירה</NavLink>
                <NavLink className='link item appliances animal' exact to="/animal">חיות</NavLink>
                <NavLink className='link item furniture' exact to="/furniture">רהיטים</NavLink>
                <NavLink className='link item appliances' exact to="/appliances">מוצרי חשמל</NavLink>
                <NavLink className='link item cars' exact to="/cars">מכוניות</NavLink>
            </div>
            <NavLink className='link sighUp' to="/sighUp">הרשמה</NavLink>
            <NavLink className='link login' to="/login">התחברות</NavLink>

        </div>
    );
}

export default Nav;