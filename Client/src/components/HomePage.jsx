import React from 'react';
import Nav from './Nav';

function HomePage() {
    console.log("HomePage");
    return (
        <div>
            <Nav status="layote"/>
            <h1>HomePage</h1>
        </div>
    );
}

export default HomePage;