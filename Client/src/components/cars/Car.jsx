import React, { useState, useEffect } from 'react';
import watchap from "../../images/whatsapp-icon.webp"
import CarInpute from './CarInpute';
import mail from '../../images/gmail.png'
import delete_ from '../../images/delete.png'
import update from '../../images/update.png'
import heart from '../../images/heart.png'
import shekel from '../../images/shekel.png'
import send from '../../images/send.png'






function Car(props) {
  const car = props.car;
  const [showSailerDaetails, setShowSailerDaetails] = useState(false);
  const [sailerDaetails, setSailerDaetails] = useState({});
  const [currentUser, setCurrentUser] = useState('');
  const [updateDiv, setUpdateDiv] = useState(false);
  const [message, setMessage] = useState("");
  const [showMessageDiv, setShowMessageDiv] = useState(false);
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

  async function conecctUse(useOfTheProductId, currentUser, message) {
    console.log(useOfTheProductId);
    const detail = { "useOfTheProductId": useOfTheProductId, "currentUser": currentUser, message: message }
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

  async function deletCar(carId) {
    console.log(currentUser.user_id);
    try {
      const response = await fetch(`http://localhost:3300/api/cars/${carId}/${currentUser.user_id}`, {
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
  async function saveAd(userId, carId, type) {
    const detail = { "userId": userId, "carId": carId, "type": type }
    try {
      const response = await fetch(`http://localhost:3300/api/user/reservedAds`, {
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
      console.log(data);


    } catch (error) {
      console.log(error);
    }


  }
  const formattedNumber = parseInt(car.cost).toLocaleString('en-US'); // Format to US locale

  console.log("Businesses");
  return (
    <div>
      <div className="car-item" >
        <img src={`data:image/png;base64,${car.imageData}`} alt="car" className='image' onClick={openImage} />
        {props.state != "reservedAds" && currentUser.user_id !== "" && <button className='hert' type='submit' onClick={() => saveAd(currentUser.user_id, car.id, car.product_type)}>
          <img src={heart} width={15} height={15}></img> </button>}
        <p className="car-property company">{car.company}</p>
        <p className="car-property km">{car.km}  km - yad 2</p>
        <p className="car-property sereval_years_in_use">was {car.several_years_in_use} years in use</p>
        <p className="car-property year_of_production">The car was manufactured in {car.year_of_production}</p>
        <p className="car-property cost">{formattedNumber}<img src={shekel} width={15} height={15}></img></p>
        <div className='actionProduct'>
          <button className='buttonAction' onClick={() => setShowMessageDiv(!showMessageDiv)} disabled={currentUser === ""}>
            <img src={mail} width={15} height={15}></img>
          </button>
          {props.state != "reservedAds" && (currentUser.user_id == car.user_id || currentUser.manger == true) && < button className='buttonAction' onClick={() => deletCar(car.id)}>
            <img src={delete_} width={15} height={15}></img>
          </button>}

          {props.state != "reservedAds" && currentUser.user_id == car.user_id && <button className='buttonAction' type='submit' onClick={() => setUpdateDiv(!updateDiv)}>
            <img src={update} width={15} height={15}></img></button>}
          <button  className='buttonAction' onClick={() => { showSellDetail(car.user_id) }}>
            <img src={watchap} width={15} height={15}></img>
          </button>
        </div>
        {showSailerDaetails && <div className='sailerDaetails'>
          <p>{sailerDaetails.name}</p>
          <p>{sailerDaetails.email}</p>
          <p>{sailerDaetails.phone}</p>
        </div>}
        {updateDiv && <CarInpute className="update" companies={props.companies} state={"update"} id={car.id} setShowDiv={setUpdateDiv} car={car} />}
        {showMessageDiv && <div className='sendEmail'><label>enter a message to the sailer</label><input className='sendEmailInput' value={message} onChange={(e) => setMessage(e.target.value)}></input>
          <button className="sendEmailB" onClick={() => conecctUse(car.user_id, currentUser, message)}>
            <img src={send} width={15} height={15}></img>
          </button></div>}
      </div>

    </div >

  );
}

export default Car;