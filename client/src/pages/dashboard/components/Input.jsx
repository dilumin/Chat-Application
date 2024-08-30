import React, { useState, useContext } from 'react';
import MessageContext from '../../../context/MessageProvider';
import DashboardContext from '../../../context/DashboardProvider';
import { SocketContext } from '../../../context/SocketContext';

function Input() {
  const [input, setInput] = useState('');
  const { MyInfo } = useContext(DashboardContext);
  const { socket } = useContext(SocketContext);
  const { setLastSent, setSent, lastSent, selectedFriend } = useContext(MessageContext);

  const [isDragging, setIsDragging] = useState(false);
  const [dropped , setDropped] = useState(false);
  const [FileDetail , setFileDetail] = useState(
    { "blob" : null , "name" : "" 
    }
  );
  const downloadFile = (text, fileName) => {
    // Logic to download the file
    // For example, you can create a temporary anchor element and simulate a click to trigger the download
    const element = document.createElement('a');
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    console.log("FILE NAME IS", element.href);
    element.download = fileName;

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  

  
  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    setDropped(true);
    const file = event.dataTransfer.files[0];
    setFileDetail(
      { "blob" : file , "name" : file.name }
    )
    if (file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        console.log(text);
        // downloadFile(text, file.name);
      };
      reader.readAsText(file);
    } else {
      console.log(file);
      uploadToAzure(file, file.name);
    }
  };

  const uploadToAzure = (data, fileName) => {

  };

  const sendFile = ()=>{
    setDropped(false)
    console.log("SENDING FILE");
    console.log("FILE DETAIL IS", FileDetail);
    setInput(FileDetail)
    console.log("INPUT IS", input);
    setLastSent(FileDetail);
    console.log("LAST SENT IS", lastSent);
    sendMessage();
  }

  const sendMessage = () => {
    setLastSent(input);
    setSent(prev => !prev);
    try {
      socket.emit('messaging', { sender: MyInfo.email, receiver: selectedFriend, message: input });
      console.log('Message sent:', input);
    } catch (error) {
      console.log("Error sending message:", error);
    }
    setInput('');
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div>
      <div className='flex'
      onDragOver={() => setIsDragging(true)}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}

      style={{
        background: isDragging ? 'gray' : 'white'
      }}
      
      >
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
      {/* creating a modal window*/}
      {dropped && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-semibold mb-4">This is a modal</h2>
            <p className="mb-4">Here is some text inside the modal.</p>
            <button
              onClick={sendFile}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Send File
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Input;
