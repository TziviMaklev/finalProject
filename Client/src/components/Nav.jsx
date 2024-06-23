import React from 'react';
import { Link } from 'react-router-dom';
import '../style/nav.css'

function Nav() {
    console.log("nav");
    return (
        <div className='navDiv'>
            <Link className='link home' to="/homePage">בית</Link>
            {/* <Link className='link reservedAds' to="/reservedAds">מודעות שמורות</Link>
            <Link className='link addItem' to="/addItem">הוספת פריט</Link> */}
            <div className='items'>
                <Link className='link item businesses' exact to="/businesses">עסקים למכירה</Link>
                <Link className='link item appliances animal' exact to="/animal">חיות</Link>
                <Link className='link item furniture' exact to="/furniture">רהיטים</Link>
                <Link className='link item appliances' exact to="/appliances">מוצרי חשמל</Link>
                <Link className='link item cars' exact to="/cars">מכוניות</Link>
            </div>
            <Link className='link sighUp' to="/sighUp">הרשמה</Link>
            <Link className='link login' to="/login">התחברות</Link>

        </div>
    );
}

export default Nav;