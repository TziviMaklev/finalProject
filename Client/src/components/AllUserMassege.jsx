import React, { useState, useEffect } from 'react';
import '../style/allMassages.css'


function AllUserMassege(props) {
  const user_id = props.user_id;
  const [massagesArr, setMassagesArr] = useState([]);
  useEffect(() => {
    console.log(massagesArr);
}, [massagesArr]);
const [currentUser, setCurrentUser] = useState('');
useEffect(() => {
    if (JSON.parse(sessionStorage.getItem('currentUser')) != undefined) {
        setCurrentUser(JSON.parse(sessionStorage.getItem('currentUser')));
    }
}, []);
async function conecctUse( useOfTheProductId , currentUser) {
  console.log(useOfTheProductId);
  const detail = {"useOfTheProductId": useOfTheProductId , "currentUser": currentUser}
  try{
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
  catch(e){console.log(e);}
}
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3300/api/user/Messages/${user_id}`, {
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
        console.log(data[0]);
        setMassagesArr(data[0]);
        
      } catch (e) {
        console.log(e);
      }
    };

    fetchData(); // Call the function inside useEffect
  }, []);
  return (
    // <div className="messages-container">
    //   {massagesArr.map((message) => (
    //     <div key={message.body} className="message">
    //       <p className="message-body">{message.body}</p>
    //     </div>
    //   ))}
    // </div>
    <div className="messages-container">
    {massagesArr.length > 0 ? (
      massagesArr.map((message) => (
        <div key={message.id} className="message">
          {/* <p className="message-sender">{message.sender_id}</p> */}
          <p className="message-body">{message.body}</p>
          <button onClick={()=>{conecctUse(message.sender_id , currentUser )} }>צור קשר</button>
        </div>
      ))
    ) : (
      <p>אין הודעות חדשות.</p>
    )}
  </div>
  );
}

export default AllUserMassege;