import React, { useState, useContext } from 'react';
import MessageContext from '../../../context/MessageProvider';
import DashboardContext from '../../../context/DashboardProvider';
import { SocketContext } from '../../../context/SocketContext';

function Input() {
  const [input, setInput] = useState('');
  const { MyInfo } = useContext(DashboardContext);
  const { socket } = useContext(SocketContext);
  const { setLastSent, setSent, selectedFriend } = useContext(MessageContext);

  const sendMessage = () => {
    setLastSent(input);
    setSent(prev => !prev);
    setInput('');
    try {
      socket.emit('messaging', { sender: MyInfo.email, receiver: selectedFriend, message: input });
    } catch (error) {
      console.log("Error sending message:", error);
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div>
      <div className='flex' style={{}}>
        <input
          value={input}
          type="text"
          style={{ width: "90%", borderRadius: "5px" }}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown} // Handle Enter key press
        />
        <button
          onClick={sendMessage} // Handle button click
          style={{ background: "#327fff", width: "10%", borderRadius: "5px", color: "black" }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Input;
