import React, { useState, useEffect } from 'react';


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
    async function conecctUse( useOfTheProductId , currentUser) {
        console.log(useOfTheProductId);
        const detail = {"useOfTheProductId": useOfTheProductId , "currentUser": currentUser}
        try{
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
        catch(e){console.log(e);}
      }


      async function showSellDetail(id) {
  
          setShowSailerDaetails(!showSailerDaetails)
          if(!showSailerDaetails){
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
          } }
      
      }
      console.log(currentUser.user_id , appliance.user_id ,  currentUser.user_id == appliance.user_id  , appliance.id);

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
    return (
         <>
        <div>
            <p>cost:{appliance.cost}</p>
            <p>model:{appliance.model}</p>
            <p>product details:{appliance.product_details}</p>
            <p>several years in use :{appliance.several_years_in_use}</p>
            <p>statuse: {appliance.statuse}</p>
            <img src={`data:image/png;base64,${appliance.imageData}`} alt="Apartment" className='image'/>
            <button onClick={() => { showSellDetail(appliance.user_id) }}>ראה פרטי מוכר</button>
            <button onClick={()=>conecctUse(appliance.user_id  , currentUser )} className="contact-button"> ליצירת קשר</button>
        </div>
        {
                showSailerDaetails && <div>
                    <p>{sailerDaetails.name}</p>
                    <p>{sailerDaetails.email}</p>
                    <p>{sailerDaetails.phone}</p>
                </div>
            }
            {
              (currentUser.user_id == appliance.user_id || currentUser.manger == true) && 
              <button onClick={()=> deletAppliance(appliance.id)}>✏️</button>
            }
        </>

    );
}

export default Appliance;