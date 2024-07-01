// import React from 'react';
import React, { useState, useEffect } from 'react';
import Sort from '../tools/Sort';
import Appliance from './Appliance';

function AllAppliances(props) {
  console.log("AllAppliances");
  const [appliancesArr, setAppliancesArr] = useState([]);
  const [sortArr, setSortArr] = useState([]);
  const [currentUser, setCurrentUser] = useState('');
  useEffect(() => {
    if (JSON.parse(sessionStorage.getItem('currentUser')) != undefined) {
      setCurrentUser(JSON.parse(sessionStorage.getItem('currentUser')));
    }
  }, []);
  console.log("currentUser", currentUser);
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
        console.log(data);
        setAppliancesArr(data);
        setSortArr(data)
      } catch (e) {
        console.log(e);
      }
    };

    fetchData(); // Call the function inside useEffect
  }, []);


  return (
    <>
      <Sort arr={appliancesArr} setArr={setSortArr} status={'appliance'} companies={props.companies}></Sort>
      <div className='appliance-list'>
        {sortArr.map((appliance) => (
          <Appliance  state={""} key={appliance.id} appliance={appliance} setAppliancesArr={setAppliancesArr} setSortArr={setSortArr} companies={props.companies}>
          </Appliance>
        ))}
      </div>
    </>

  );
}

export default AllAppliances;