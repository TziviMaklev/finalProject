import React from 'react';
import Nav from './Nav';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';


function Login() {
    console.log("Login");
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const loginUser = { "userName": userName, "password": password }

    async function handleLogIn() {
        const response = await fetch(`http://localhost:3306/api/login`, {
            method: 'POST',
            body: JSON.stringify(loginUser),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        if (json_response.length !== 0) {
            setLoginError(json_response);
        }
        else {
            setLoginError("error log in try again");

        }
    };

    return (
        <div>
            <Nav></Nav>
            <h1 id='titleLogin'>To Login⬇</h1>
            <input
                type="text"
                placeholder="שם משתמש"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
            />
            <input
                type="password"
                placeholder="סיסמא"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleLogIn}>send</button>
            <p id="loginError">{loginError}</p>

            <NavLink to="/sighUp">SighUp</NavLink>
        </div>

    );
}

export default Login;



// import React from 'react'
// import { useState } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import './login.css'

// export default function LogIn() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [log_in_error, setLog_in_error] = useState('');
//     const navigate = useNavigate();
//     const loginUser = { "email": email, "password": password }
//     async function handleLogIn() {
//         const response = await fetch(`http://localhost:3306/api/login`, {
//             method: 'POST',
//             body: JSON.stringify(loginUser),
//             headers: {
//                 'Content-type': 'application/json; charset=UTF-8',
//             },
//         })
//         // .catch(error => {
//         //     console.log("Error:", error);
//         //     setLog_in_error("error server");
//         // });
//         //const json_response = await response.json();

//         if (json_response.length !== 0) {
//             setLog_in_error('');
//             // localStorage.setItem("currentUser", JSON.stringify(json_response[0]));
//             // window.history.replaceState(null, '', '/');
//             // navigate(`/users/${json_response[0].id}`);
//         }
//         else {
//             setLog_in_error("error log in try again");

//         }
//     };
//     return (
//         <div className='loginOrRegistration'>

//             <div>
//                 <h1 id='titleLogin'>To Login⬇</h1>
//                 <input
//                     type="text"
//                     placeholder="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                 />
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <p id="log_in_error">{log_in_error}</p>
//                 <button onClick={handleLogIn}>send</button>
//             </div>
//             <NavLink to="/signup">
//                 Sign Up
//             </NavLink>
//         </div>
//     )
// }
