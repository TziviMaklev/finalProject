import React, { useState, useEffect } from 'react';
import '../style/nav.css'


function AddManeger(props) {
    const [showSighUp, setShowSighUp] = useState(props.showSignUp);
    console.log("AddManeger");
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [error, setError] = useState('');
    const [user, setUser] = useState('אנונימי');
    const [verifyPassword, setVerifyPassword] = useState('');
    const newManager = { passwordDetails: { "userName": userName, "password": password }, infoDetails: { "name": name, "email": email, "city": city, "phone": phone } };
    async function handleSighUp(e) {
        setShowSighUp(!showSighUp)
        setError("")
        e.preventDefault()
        if (password === verifyPassword) {
            try {
                const response = await fetch('http://localhost:3300/api/manager', {
                    method: 'POST',
                    body: JSON.stringify(newManager),
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
                setError("")
                setUser(data)
                // const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
                let id = user.user_id;
                console.log('Sign up successful!');  // הודעת הצלחה

            } catch (error) {
                setError("משתמש זה כבר קיים")

                // console.log('Error: sighup ' + error.message);  // הצגת הודעת שגיאה
            }
            console.log(user);
        } else {
            console.log('Passwords do not match. Please try again.');
            setError('Passwords do not match. Please try again.')  // הצגת הודעת שגיאה אם הסיסמאות לא תואמות
        }
    }

    return (
        <div>
            {showSighUp && <form class="signup-form" onSubmit={handleSighUp} className="add-manager-form"  >
                <h1 id="titleSignUp">add manager</h1>

                <div class="input-group">
                    <label for="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        class="input-field"
                        placeholder="Enter Username"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required  // Add required attribute for mandatory field
                    />
                    <p class="error" id="usernameError"></p>  </div>

                <div class="input-group">
                    <label for="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        class="input-field"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required  // Add required attribute for mandatory field
                        minLength={8}  // Enforce minimum password length
                    />
                    <p class="error" id="passwordError"></p>  </div>

                <div class="input-group">
                    <label for="verifyPassword">Verify Password:</label>
                    <input
                        type="password"
                        id="verifyPassword"
                        class="input-field"
                        placeholder="Re-enter Password"
                        value={verifyPassword}
                        onChange={(e) => setVerifyPassword(e.target.value)}
                        required  // Add required attribute for mandatory field
                    />
                    <p class="error" id="verifyPasswordError"></p>  </div>

                <div class="input-group">
                    <label for="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        class="input-field"
                        placeholder="Enter Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required  // Add required attribute for mandatory field
                    />
                    <p class="error" id="nameError"></p>  </div>

                <div class="input-group">
                    <label for="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        class="input-field"
                        placeholder="Enter Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required  // Add required attribute for mandatory field
                    />
                    <p class="error" id="emailError"></p>  </div>

                <div class="input-group">
                    <label for="phone">Phone Number:</label>
                    <input
                        type="tel"  // Change type to "tel" for phone number formatting
                        id="phone"
                        class="input-field"
                        placeholder="Enter Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <p class="error" id="phoneError"></p>  </div>

                <div class="input-group">
                    <label for="city">City:</label>
                    <input
                        type="text"
                        id="city"
                        class="input-field"
                        placeholder="Enter City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <p class="error" id="cityError"></p>  </div>

                <p class="error">{error}</p>  <button class="submit-btn" type="submit" >  Sign Up
                </button>
            </form>}
        </div>

    );
}

export default AddManeger;