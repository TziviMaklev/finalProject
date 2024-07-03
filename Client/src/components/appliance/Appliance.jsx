import React, { useState, useEffect } from 'react';
import watchap from "../../images/whatsapp-icon.webp"
import AppliancesInpute from './AppliancesInpute';
import mail from '../../images/gmail.png'
import delete_ from '../../images/delete.png'
import update from '../../images/update.png'
import heart from '../../images/heart.png'
import shekel from '../../images/shekel.png'
import send from '../../images/send.png'


function Appliance(props) {
  let appliance = props.appliance;
  const [currentUser, setCurrentUser] = useState('');
  const [showSailerDaetails, setShowSailerDaetails] = useState(false);
  const [sailerDaetails, setSailerDaetails] = useState({});
  const [updateDiv, setUpdateDiv] = useState(false);
  const [showMessageDiv, setShowMessageDiv] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (JSON.parse(sessionStorage.getItem('currentUser')) != undefined) {
      setCurrentUser(JSON.parse(sessionStorage.getItem('currentUser')));
    }
  }, []);
  console.log("Businesses");
  async function conecctUse(useOfTheProductId, currentUser, message) {
    setShowMessageDiv(!showMessageDiv)
    console.log(useOfTheProductId);
    const detail = { "useOfTheProductId": useOfTheProductId, "currentUser": currentUser, message: message }
    try {
      const response = await fetch(`http://localhost:3300/api/application/sendMail`, {
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
      setShowMessageDiv(!showMessageDiv);
      setMessage("")

    }
    catch (e) { console.log(e); }
  }


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

  async function deletAppliance(userId) {
    try {
      const response = await fetch(`http://localhost:3300/api/appliances/${userId}`, {
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

  function openImage() {
    const newTab = window.open('', '_blank');
    console.log(appliance.imageData);
    newTab.location.href = `data:image/png;base64,${appliance.imageData}`;

    const blob = appliance.blob(); // Get the blob data directly
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `image-${article_id}.png`; // Set a default filename with extension
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  async function deletAppliance(applianceID) {
    try {
      const response = await fetch(`http://localhost:3300/api/appliances/${applianceID}/${currentUser.user_id}`, {
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
        props.setAppliancesArr(data);
        props.setSortArr(data);
      }
      console.log('appliance deleted');
    } catch (e) {
      console.log(e);
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
  // const numberElement = document.getElementById('my-number');
  const formattedNumber = parseInt(appliance.cost).toLocaleString('en-US'); // Format to US locale
  // numberElement.textContent = formattedNumber; // Update the HTML content

  return (
    <div>
      <div className="appliance-item">
        <img src={`data:image/png;base64,${appliance.imageData}`} alt="appliance" className='image' onClick={openImage} />
        {props.state !== "reservedAds" && currentUser.user_id !== "" && <button className='hert' type='submit' onClick={() => saveAd(currentUser.user_id, appliance.id, appliance.product_type)}>
          <img src={heart} width={15} height={15}></img> </button>}
        <p className="car-property cost" id="my-number">{formattedNumber}<img src={shekel} width={15} height={15}></img></p>
        <p className='appliance-property model'>{appliance.model}</p>
        <p className="car-property sereval_years_in_use">was {appliance.several_years_in_use} years in use</p>
        <p className='appliance-property product_details'>{appliance.product_details}</p>
        <p className='appliance-property statuse'><strong>statuse:</strong> {appliance.statuse}</p>
        <div className='actionProduct'>
          <button className='buttonAction' onClick={() => setShowMessageDiv(!showMessageDiv)} disabled={currentUser === ""}>
            <img src={mail} width={15} height={15}></img>
          </button>
          {props.state !== "reservedAds" &&
            (currentUser.user_id == appliance.user_id || currentUser.manger == true) &&
            <button className='buttonAction' onClick={() => setUpdateDiv(!updateDiv)}>
              <img src={update} width={15} height={15}></img></button>}
          {props.state !== "reservedAds" && (currentUser.user_id == appliance.user_id || currentUser.manger == true) && < button className='buttonAction' onClick={() => deletAppliance(appliance.id)}>
            <img src={delete_} width={15} height={15}></img></button>}
          <button className='buttonAction' onClick={() => { showSellDetail(appliance.user_id) }}>
            <img src={watchap} width={15} height={15}></img></button>
        </div>
        {updateDiv && <AppliancesInpute companies={props.companies} state={"update"} id={appliance.id} setShowDiv={setUpdateDiv} appliance={appliance} />}

        {showSailerDaetails && <div className='sailerDaetails'>
          <p>{sailerDaetails.name}</p>
          <p>{sailerDaetails.email}</p>
          <p>{sailerDaetails.phone}</p>
        </div>}
        {showMessageDiv && <div className='sendEmail'><label>enter a message to the sailer</label><input className='sendEmailInput' value={message} onChange={(e) => setMessage(e.target.value)}></input>
          <button className="sendEmailB" onClick={() => conecctUse(appliance.user_id, currentUser, message)}><img src={send} width={15} height={15}></img></button></div>}
      </div>
    </div>

  );
}

export default Appliance;