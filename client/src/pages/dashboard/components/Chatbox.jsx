import React from 'react';
import Message from './Message';

function Chatbox() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <div className="h-5/6 w-3/4 bg-gray-200 p-6 flex flex-col justify-between rounded-lg shadow-lg overflow-hidden">
        <div className="flex flex-col space-y-4 overflow-y-auto p-4">
          <Message msg="WTF DUDE" username="Shyamal" Me="" />
          <Message msg="WTF DUDE" username="Shyamal" Me="" />
          <Message msg="WTF DUDE" username="Shyamal" Me="" />
          <Message msg="WTF DUDE" username="Shyamal" Me="true" />
            <Message msg="WTF DUDE" username="Shyamal" Me="" />
            <Message msg="WTF DUDE" username="Shyamal" Me="" />
            <Message msg="WTF DUDE" username="Shyamal" Me="" />
            <Message msg="WTF DUDE" username="Shyamal" Me="" />
          {/* Add more messages to see the scroll effect */}

        </div>
      </div>
      <div className=' flex' >
        <input type="text" style={{width: "100%"}} />
        <button>Send</button>
      </div>
      
    </div>
  );
}

export default Chatbox;
