import React, { useState, useEffect } from 'react';


function Car(props) {
  const car = props.car;
  const [showSailerDaetails, setShowSailerDaetails] = useState(false);
  const [sailerDaetails, setSailerDaetails] = useState({});
  const [currentUser, setCurrentUser] = useState('');
  useEffect(() => {
    if (JSON.parse(sessionStorage.getItem('currentUser')) != undefined) {
      setCurrentUser(JSON.parse(sessionStorage.getItem('currentUser')));
    }
  }, []);
  async function showSellDetail(id) {

    setShowSailerDaetails(!showSailerDaetails)
    if (!showSailerDaetails) {
      try {
        const response = await fetch(`http://localhost:3300/api/user/${id}`, {
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
        console.log(data[0][0]);
        setSailerDaetails(data[0][0]);
      } catch (e) {
        console.log(e);
      }
    }

  }

  async function conecctUse(useOfTheProductId, currentUser) {
    console.log(useOfTheProductId);
    const detail = { "useOfTheProductId": useOfTheProductId, "currentUser": currentUser }
    try {
      const response = await fetch(`http://localhost:3300/api/car/sendMail`, {
        method: 'POST',
        body: JSON.stringify(detail),
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
    }
    catch (e) { console.log(e); }
  }

  async function deletCar(userId) {
    try {
      const response = await fetch(`http://localhost:3300/api/cars/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      });
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || 'Network response was not ok');
      }
      console.log('appliance deleted');
    } catch (e) {
      console.log(e);
    }

  }
  console.log("Businesses");
  return (
    <div>
      <div className="car-item">
        <div className="car-details">
          {/* <p className="car-property">Product Details: {car.product_details}</p> */}
          <p className="car-property">Cost: {car.cost}</p>
          <p className="car-property">KM: {car.km}</p>
          {/* <p className="car-property">Years in Use: {car.several_years_in_use}</p> */}
          <p className="car-property">Status: {car.statuse}</p>
          {/* <p className="car-property">Year of Production: {car.year_of_production}</p> */}
          <img src={`data:image/png;base64,${car.imageData}`} alt="Apartment" className='image' />
        </div>
        <button onClick={() => { showSellDetail(car.user_id) }}>ראה פרטי מוכר</button>
        <button onClick={() => conecctUse(car.user_id, currentUser)} className="contact-button"> ליצירת קשר</button>
        <hr className="car-divider" />
      </div>
      {showSailerDaetails && <div>
          <p>{sailerDaetails.name}</p>
          <p>{sailerDaetails.email}</p>
          <p>{sailerDaetails.phone}</p>
        </div>}
      {(currentUser.user_id == car.user_id || currentUser.manger == true) &&< button onClick={() => deletCar(car.id)}>🚮</button>}
      {currentUser.user_id == car.user_id && <button onClick={()=>console.log("upDate")}>✏️</button>}
      {/* {currentUser.manger == true && <>yugio;</>} */}

    </div >

  );
}

export default Car;