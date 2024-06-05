import '../css/Nav.css'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react';
import React from 'react';


export default function Header() {
    const [showInfo, setShowInfo] = useState(false);
    const [onHomePage, setOnHomePage] = useState();
    const navigate = useNavigate();
    const { id } = useParams();
    return (
        <>
            <nav>
           
            </nav >
        </>
    )
}

function logout(navigate) {
    localStorage.clear();
    navigate("/");
}