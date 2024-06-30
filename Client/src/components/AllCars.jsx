import React, { useState, useEffect } from 'react';
import '../style/allCars.css'
import Car from './Car';
import Sort from './Sort';

function AllCars(props) {
  const [carArr, setCarArr] = useState([]);
  const [sortArr, setSortArr] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3300/api/cars', {
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
        setCarArr(data);
        setSortArr(data)
      } catch (e) {
        console.log(e);
      }
    };
    fetchData(); // Call the function inside useEffect
  }, []);


  return (
    <>
      <Sort  arr={carArr}  setArr={setSortArr} companies={props.companies} status={'car'}></Sort>
      <div className="car-list">
        {sortArr.map((car) => (
          <Car key={car.id} car={car}  setCarArr={setCarArr}  setSortArr={setSortArr} companies={props.companies} carDetails={car}/>
        ))}
      </div>
    </>
  );
}

export default AllCars;
