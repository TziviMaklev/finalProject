import React, { useState, useEffect } from 'react';
import watchap from "../images/whatsapp-icon.webp"
import CarInpute from './CarInpute';

function Car(props) {
  const car = props.car;
  const [showSailerDaetails, setShowSailerDaetails] = useState(false);
  const [sailerDaetails, setSailerDaetails] = useState({});
  const [currentUser, setCurrentUser] = useState('');
  const [updateDiv, setUpdateDiv] =useState(false);
  const [message , setMessage] = useState("");
  const [showMessageDiv , setShowMessageDiv] = useState(false);
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

  async function conecctUse(useOfTheProductId, currentUser , message) {
    console.log(useOfTheProductId);
    const detail = { "useOfTheProductId": useOfTheProductId, "currentUser": currentUser , message : message }
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
      setShowMessageDiv(!showMessageDiv)
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
      else {
        const data = await response.json();
        console.log(data);
        props.setCarArr(data);
        props.setSortArr(data);
      }


      console.log('appliance deleted');
    } catch (e) {
      console.log(e);
    }

  }

  function openImage() {
    try {
      // Validate appliance.imageData format
      if (!/^data:image\/png;base64,.*/.test(appliance.imageData)) {
        throw new Error("Invalid data URL format for image. Expected data:image/png;base64,[Base64 encoded image data]");
      }

      // Open the new tab
      const newTab = window.open('', '_blank');

      // Check if the tab is successfully opened (security measure)
      if (!newTab) {
        throw new Error("Failed to open new tab. Pop-up blockers might be enabled.");
      }

      // Set the new tab's location to the data URL
      newTab.location.href = appliance.imageData;
    } catch (error) {
      console.error("Error opening image:", error.message);
      // Optionally display an error message to the user
      alert("There was an error opening the image. Please try again later.");
    }
  }
  console.log("Businesses");
  return (
    <div>
      <div className="car-item">
      <img src={`data:image/png;base64,${car.imageData}`} alt="car" className='image' onClick={openImage} />
        <div className="car-details">
          <p className="car-property">Cost: {car.cost}</p>
          <p className="car-property">KM: {car.km}</p>
          <p className="car-property">Status: {car.statuse}</p>
          <button onClick={() => { showSellDetail(car.user_id) }}>ראה פרטי מוכר</button>
        </div>
        <hr className="car-divider" />

        <button>
        <img onClick={() =>setShowMessageDiv(!showMessageDiv)} src={watchap} width={30} height={30}></img>
        </button>
        {showMessageDiv && 
        <>
        <input  value={message} onChange={(e)=> setMessage(e.target.value)}></input>
        <button onClick={()=>conecctUse(car.user_id, currentUser , message)}>send</button>
        </>
        }
        {(currentUser.user_id == car.user_id || currentUser.manger == true) && < button onClick={() => deletCar(car.id)}>🚮</button>}
        {currentUser.user_id == car.user_id && <button type='submit' onClick={() => setUpdateDiv(!updateDiv)}>✏️</button>}
        {  updateDiv && <CarInpute companies={props.companies} state={"update"} id={car.id} setShowDiv ={setUpdateDiv} car={car}/>}
        <hr className="car-divider" />
        {showSailerDaetails && <div>
          <p>{sailerDaetails.name}</p>
          <p>{sailerDaetails.email}</p>
          <p>{sailerDaetails.phone}</p>
        </div>}
      </div>
    </div >

  );
}

export default Car;