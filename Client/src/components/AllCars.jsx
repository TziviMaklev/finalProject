import React, { useState, useEffect } from 'react';
import '../style/allCars.css'
import Car from './Car';

function AllCars() {
  const [carArr, setCarArr] = useState([]);
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
      } catch (e) {
        console.log(e);
      }
    };
    fetchData(); // Call the function inside useEffect
  }, []);


return (
  <div className="car-list">
    {carArr.map((car) => (
      <Car key={car.id} car={car}/>
    ))}
  </div>
);
}

export default AllCars;
