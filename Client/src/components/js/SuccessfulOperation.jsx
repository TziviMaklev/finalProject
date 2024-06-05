import '../css/Messege.css';
import React from 'react';

export default function SuccessfulOperation({messege}) {
    return (        
        <div className="messege">
            <h3>The {messege} was successful</h3>
        </div>
    )
}