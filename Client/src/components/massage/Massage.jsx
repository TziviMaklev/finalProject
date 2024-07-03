import React, { useState, useEffect } from 'react';
import watchap from "../../images/whatsapp-icon.webp"
import delete_ from '../../images/delete.png'
import mail from '../../images/gmail.png'
import send from '../../images/send.png'


function Massage({ message, conecctUse, currentUser, showMessageDiv, setShowMessageDiv ,setMassagesArr}) {
  const [messageText, setMessageText] = useState("");
  const [showMail, setShowMail] = useState(false);
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
      <div className='actionMassage'>
      <button  className='buttonAction' onClick={() => setShowMail(!showMail)}>
      <img src={mail} width={15} height={15}></img>
      </button>

     < button  className='buttonAction' onClick={() => deletMessage(currentUser.user_id,message.messages_id)}>
     <img src={delete_} width={15} height={15}></img>
     </button>
     {showMail &&
        <div >
          <input value={messageText} onChange={(e) => setMessageText(e.target.value)}></input>
          <button  className='buttonAction' onClick={() => conecctUse(message.sender_id, currentUser, messageText)}>
          <img src={send} width={15} height={15}></img></button>
        </div>
      }
     </div>
    </div>
  );
}

export default Massage;