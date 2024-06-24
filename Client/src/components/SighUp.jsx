import React from 'react';
import Nav from './Nav';
import { useState } from 'react';
import '../style/sighUp.css'
import { Link, NavLink } from 'react-router-dom';


function SighUp() {
    console.log("SighUp");
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [error, setError] = useState('');
    const [user , setUser] = useState('אנונימי');
    const [verifyPassword, setVerifyPassword] = useState('');
    const newUser = { passwordDetails: { "userName": userName, "password": password }, infoDetails: { "name": name, "email": email, "city": city, "phone": phone } };
    async function handleSighUp() {
        if (password === verifyPassword) {
            try {
                const response = await fetch('http://localhost:3300/api/signUp', {
                    method: 'POST',
                    body: JSON.stringify(newUser),
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                    },
                });
                // בדיקה אם התגובה מהשרת אינה תקינה
                if (!response.ok) {
                    const errorResponse = await response.json();
                    throw new Error(errorResponse.error || 'Network response was not ok');
                }
                // קריאה לתגובה מהשרת אם התגובה תקינה
                const data = await response.json();
                console.log(data);
                console.log(data[0][0].name);
                setUser(data[0][0].name);
                setError("")
                console.log('Sign up successful!');  // הודעת הצלחה

            } catch (error) {
                setError(error.message)
                console.log('Error: sighup ' + error.message);  // הצגת הודעת שגיאה
            }
            console.log(user);
        } else {
            console.log('Passwords do not match. Please try again.');  // הצגת הודעת שגיאה אם הסיסמאות לא תואמות
        }
    }
    return (
        <>
            <Nav />
            <div class="signup-container">
                <div>{user}</div>
                <div class="signup-form">
                    <h1 id="titleSignUp">To SighUp</h1>

                    <div class="input-group">
                        <label for="username">Username:</label>
                        <input type="text" id="username" class="input-field" placeholder="Enter Username" value={userName} onChange={(e) => setUserName(e.target.value)}></input>
                    </div>

                    <div class="input-group">
                        <label for="password">Password:</label>
                        <input type="password" id="password" class="input-field" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    </div>

                    <div class="input-group">
                        <label for="verifyPassword">Verify Password:</label>
                        <input type="password" id="verifyPassword" class="input-field" placeholder="Re-enter Password" value={verifyPassword} onChange={(e) => setVerifyPassword(e.target.value)}></input>
                    </div>

                    <div class="input-group">
                        <label for="name">Name:</label>
                        <input type="text" id="name" class="input-field" placeholder="Enter Your Name" value={name} onChange={(e) => setName(e.target.value)}></input>
                    </div>

                    <div class="input-group">
                        <label for="email">Email:</label>
                        <input type="email" id="email" class="input-field" placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    </div>

                    <div class="input-group">
                        <label for="phone">Phone Number:</label>
                        <input type="phone" id="phone" class="input-field" placeholder="Enter Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)}></input>
                    </div>

                    <div class="input-group">
                        <label for="city">City:</label>
                        <input type="text" id="city" class="input-field" placeholder="Enter City" value={city} onChange={(e) => setCity(e.target.value)}></input>
                    </div>

                    <p class="error">{error}</p> <button class="submit-btn" onClick={handleSighUp}>Sign Up</button>

                    <NavLink to="/login">Already have an account? Login here</NavLink> </div>
            </div></>


    );
}

export default SighUp;


