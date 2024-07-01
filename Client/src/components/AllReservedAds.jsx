import React, { useState, useEffect } from 'react';


function AllReservedAds({user_id}) {
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`http://localhost:3300/api/user/reservedAds/${user_id}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json; charset=UTF-8',
              },
            });
            if (!response.ok) {
              const errorResponse = await response.json();
              throw new Error(errorResponse.error || 'Network response was not ok');
            }
            const data = await response.json();
            console.log(data);

          } catch (e) {
            console.log(e);
          }
        };
    
        fetchData(); // Call the function inside useEffect
      }, []);
    console.log("AllReservedAds");
    return (
        <div>
            <h1>AllReservedAds</h1>
        </div>

    );
}

export default AllReservedAds;