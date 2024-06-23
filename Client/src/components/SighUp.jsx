import React from 'react';
import Nav from './Nav';
import { useState } from 'react';


function SighUp() {
    console.log("SighUp");
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    let newUser = { "userName": userName, "password": password, "name": name, "email": email, "phone": phone };
    async function handleSighUp() {
        const newUser = { name, email, password };
        if (password === verifyPassword) {
            try {
                const response = await fetch('http://localhost:3306/api/user/signUp', {
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
                console.log('Sign up successful!');  // הודעת הצלחה

            } catch (error) {
             console.log('Error: ' + error.message);  // הצגת הודעת שגיאה
            }
        } else {
            console.log('Passwords do not match. Please try again.');  // הצגת הודעת שגיאה אם הסיסמאות לא תואמות
        }
    }
    return (
        <div>
            <Nav></Nav>
            <h1 id='titleSighUp'>To SighUp</h1>
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
            <input
                type="password"
                placeholder="סיסמא"
                value={verifyPassword}
                onChange={(e) => setVerifyPassword(e.target.value)}
            />
            <input
                type="text"
                placeholder="שם"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="email"
                placeholder="מייל"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="phone"
                placeholder="טלפון"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            <input
                type="text"
                placeholder="עיר"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <button onClick={handleSighUp}>send</button>

        </div>

    );
}

export default SighUp;


