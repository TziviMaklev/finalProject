// import React from 'react';
import React, { useState, useEffect } from 'react';

import Appliance from './Appliance';

function AllAppliances(props) {
    console.log("AllAppliances");
    const [appliancesArr, setAppliancesArr] = useState([]);
    const [currentUser, setCurrentUser] = useState('');
    useEffect(() => {
        if (JSON.parse(sessionStorage.getItem('currentUser')) != undefined) {
            setCurrentUser(JSON.parse(sessionStorage.getItem('currentUser')));
        }
    }, []);
    console.log("currentUser" , currentUser);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:3300/api/appliances', {
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
          console.log(data[0]);
          setAppliancesArr(data);
        } catch (e) {
          console.log(e);
        }
      };
  
      fetchData(); // Call the function inside useEffect
    }, []);


    return (
        <>
        {appliancesArr.map((appliance) => (
          <Appliance key={appliance.id} appliance={appliance}>
          </Appliance>
        ))}
      </>

    );
}

export default AllAppliances;