import React from 'react';
import Nav from './Nav';
import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import '../style/login.css'


function Login() {
    console.log("Login");
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [currentUser, setCurrentUser] = useState('');
    useEffect(() => {
        if (JSON.parse(sessionStorage.getItem('currentUser')) != undefined) {
            setCurrentUser(JSON.stringify(JSON.parse(sessionStorage.getItem('currentUser'))));
        }
    }, []);
    console.log("currentUser", currentUser);
    const navigate = useNavigate();
    async function handleLogIn() {
        const loginUser = { "userName": userName, "password": password };
        try {
            const response = await fetch(`http://localhost:3300/api/login`, {
                method: 'POST',
                body: JSON.stringify(loginUser),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.error || 'Network response was not ok');
            }
            // קריאה לתגובה מהשרת אם התגובה תקינה
            const data = await response.json();
            console.log(data.user_id);
            sessionStorage.setItem('currentUser', JSON.stringify(data));

            setLoginError("")
            navigate(`/homePage/${data.user_id}`)
            console.log('login up successful!');
        } // הודעת הצלחה }
        catch (error) {
            // console.log("Error:", error);
            setLoginError("שם משתמש או סיסמא אינם קיימים");
        }
    };

    return (
        <>
            {/* <Nav className="nav" /> */}
            <div className="signup-container">
                <div className="signup-form">
                    <h1 id="titleLogin">To Login⬇</h1>

                    <div className="input-group">
                        <label for="username">Username:</label>
                        <input type="text" id="username" className="input-field" placeholder="Enter Username" value={userName} onChange={(e) => setUserName(e.target.value)}></input>
                    </div>

                    <div className="input-group">
                        <label for="password">Password:</label>
                        <input type="password" id="password" class="input-field" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    </div>

                    <button className="submit-btn" onClick={handleLogIn}>Login</button>

                    <p id="loginError" className="error">{loginError}</p>

                    <NavLink to="/sighUp">Don't have an account? Sign Up here</NavLink>
                </div>
            </div>
        </>

    );
}

export default Login;



