import React, { useState, useEffect } from 'react';
import watchap from "../images/whatsapp-icon.webp"


function Appliance(props) {
  let appliance = props.appliance;
  const [currentUser, setCurrentUser] = useState('');
  const [showSailerDaetails, setShowSailerDaetails] = useState(false);
  const [sailerDaetails, setSailerDaetails] = useState({});
  useEffect(() => {
    if (JSON.parse(sessionStorage.getItem('currentUser')) != undefined) {
      setCurrentUser(JSON.parse(sessionStorage.getItem('currentUser')));
    }
  }, []);
  console.log("Businesses");
  async function conecctUse(useOfTheProductId, currentUser) {
    console.log(useOfTheProductId);
    const detail = { "useOfTheProductId": useOfTheProductId, "currentUser": currentUser }
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
  console.log(currentUser.user_id, appliance.user_id, currentUser.user_id == appliance.user_id, appliance.id);

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
  // function openImage() {
  //   try {
  //     // Validate appliance.imageData format
  //     if (!/^data:image\/png;base64,.*/.test(appliance.imageData)) {
  //       throw new Error("Invalid data URL format for image. Expected data:image/png;base64,[Base64 encoded image data]");
  //     }

  //     // Open the new tab
  //     const newTab = window.open('', '_blank');

  //     // Check if the tab is successfully opened (security measure)
  //     if (!newTab) {
  //       throw new Error("Failed to open new tab. Pop-up blockers might be enabled.");
  //     }

  //     // Set the new tab's location to the data URL
  //     newTab.location.href = appliance.imageData;
  //   } catch (error) {
  //     console.error("Error opening image:", error.message);
  //     // Optionally display an error message to the user
  //     alert("There was an error opening the image. Please try again later.");
  //   }
  // }
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
      else{
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
  return (
    <div>
      <div className="appliance-item">
      <img src={`data:image/png;base64,${appliance.imageData}`} alt="appliance" className='image' onClick={openImage} />
        <div className="appliance-details">
          <p className='appliance-property'>cost:{appliance.cost}</p>
          <p className='appliance-property'>model:{appliance.model}</p>
          <p className='appliance-property'>product details:{appliance.product_details}</p>
          <p className='appliance-property'>several years in use :{appliance.several_years_in_use}</p>
          <p className='appliance-property'>statuse: {appliance.statuse}</p>

          <button onClick={() => { showSellDetail(appliance.user_id) }}>ראה פרטי מוכר</button>
          {/* <button onClick={() => conecctUse(appliance.user_id, currentUser)} className="contact-button"> ליצירת קשר</button> */}
        </div>
        <hr className="appliance-divider" />
        <button>
        <img onClick={() => conecctUse(appliance.user_id, currentUser)} src={watchap} width={30} height={30}></img>
        </button>
        {
          (currentUser.user_id == appliance.user_id || currentUser.manger == true) &&
          <button onClick={() => deletAppliance(appliance.id)}>✏️</button>}
        {(currentUser.user_id == appliance.user_id || currentUser.manger == true) && < button onClick={() => deletAppliance(appliance.id)}>🚮</button>}


        <hr className="appliance-divider" />
        {
        showSailerDaetails && <div>
          <p>{sailerDaetails.name}</p>
          <p>{sailerDaetails.email}</p>
          <p>{sailerDaetails.phone}</p>
        </div>
      }
      </div>

    </div>

  );
}

export default Appliance;