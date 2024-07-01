import React, { useState, useEffect } from 'react';



function Massage({ message, conecctUse, currentUser, showMessageDiv, setShowMessageDiv ,setMassagesArr}) {
  const [messageText, setMessageText] = useState("");
  async function deletMessage(user_id , messageId) {
    console.log(currentUser);
    console.log(messageId);
    try {
      const response = await fetch(`http://localhost:3300/api/user/Messages/${user_id}/${messageId}`, {
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
        console.log(data[0]);
        setMassagesArr(data[0])
      }


      console.log('appliance deleted');
    } catch (e) {
      console.log(e);
    }

    
  }
  return (
    <div key={message.messages_id} className="message">
      <p className="message-body">{message.body}</p>
      <button onClick={() => setShowMessageDiv(!showMessageDiv)}>צור קשר</button>
      {showMessageDiv &&
        <>
          <input value={messageText} onChange={(e) => setMessageText(e.target.value)}></input>
          <button onClick={() => conecctUse(message.sender_id, currentUser, messageText)}>send</button>
        </>
      }
     < button onClick={() => deletMessage(currentUser.user_id,message.messages_id)}>🚮</button>

    </div>
  );
}

export default Massage;