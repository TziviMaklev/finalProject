import React from 'react';
import Nav from './Nav';
import AllCars from './AllCars';
import { useState, useEffect } from 'react';
import '../style/product.css'
import CarInpute from './CarInpute';

function Cars() {
  const [currentUser, setCurrentUser] = useState('');
  useEffect(() => {
    if (JSON.parse(sessionStorage.getItem('currentUser')) != undefined) {
      setCurrentUser(JSON.parse(sessionStorage.getItem('currentUser')));
    }
  }, []);

  const [companies, setCompanies] = useState([]);
  const [addCarDiv, setAddCarDiv] = useState(false);
  // const [productType, setProductType] = useState('');

  useEffect(() => {
    // קוד לאחזור נתוני חברות רכב מה-DB
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3300/api/companies/cars', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
        });
        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.error || 'Network response was not ok');
        }
        else {
          const data = await response.json();
          console.log(data);
          setCompanies(data[0]);
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);




  console.log(currentUser != "");

  return (< >
    <Nav />
    <div className="home-container">
      {currentUser != "" && <button className="add-car-btn" onClick={() => setAddCarDiv(!addCarDiv)}> + add car</button>}
      {addCarDiv && (
        <CarInpute state={"add"} companies={companies} id={0} setShowDiv ={setAddCarDiv} carDetails={{}}/>
      )}
    </div>
    <AllCars companies={companies}  />
  </>

  );
}

export default Cars;