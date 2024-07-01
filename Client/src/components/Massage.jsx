import React, { useState, useEffect } from 'react';



function Massage({message , conecctUse , currentUser , showMessageDiv  , setShowMessageDiv}) {
    const [messageText, setMessageText] = useState("");
    return (
        <div key={message.id} className="message">
        <p className="message-body">{message.body}</p>
        <button onClick={() => setShowMessageDiv(!showMessageDiv)}>צור קשר</button>
        {showMessageDiv &&
          <>
            <input value={messageText} onChange={(e) => setMessageText(e.target.value)}></input>
            <button onClick={() => conecctUse(message.sender_id, currentUser, messageText)}>send</button>
          </>
        }
      </div>
    );
}

export default Massage;