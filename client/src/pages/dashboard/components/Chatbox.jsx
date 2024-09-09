import React, { useEffect, useContext, useState, useRef } from 'react';
import Message from './Message';
import Input from './Input';
import DashboardContext from '../../../context/DashboardProvider';
import MessageContext from '../../../context/MessageProvider';
import useAxiosInstance from '../../../hooks/useAxiosInstance';
import { SocketContext } from '../../../context/SocketContext';

function Chatbox() {
  const { MyInfo } = useContext(DashboardContext);
  const axiosInstance = useAxiosInstance();
  const { socket } = useContext(SocketContext);
  const MyEmail = MyInfo.email;
  const { selectedFriend, lastSent, refresh, sent } =
    useContext(MessageContext);

  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null); // Ref for the end of messages container

  const getMessagesFromDB = async () => {
    try {
      const res = await axiosInstance.post('/getAllMessages', {
        myEmail: MyEmail,
        fEmail: selectedFriend,
      });
      console.log('ALL MESSAGES ARE:', res.data.messages);
      setMessages(res.data.messages); // Set messages state with fetched data
    } catch (error) {
      console.log('Error fetching messages at chatbox:', error);
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on('newMessage', (data) => {
        console.log('New message received:', data);
        console.log(
          'SELECTED FRIEND IS',
          selectedFriend,
          '   DATA SENDER IS',
          data.sender,
        );
        if (data.sender === selectedFriend) {
          setMessages((prevMessages) => [
            ...prevMessages,
            { me: '', msg: data.message },
          ]);
        }
      });
    }
    // Clean up the event listener when component unmounts
    return () => {
      if (socket) {
        socket.off('newMessage');
      }
    };
  }, [socket, selectedFriend]);

  useEffect(() => {
    if (selectedFriend !== '') {
      getMessagesFromDB();
    }
  }, [selectedFriend, refresh]); 

  useEffect(() => {
    if (lastSent) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { me: 'true', msg: lastSent },
      ]);
      console.log('Last sent:', lastSent);
    }
  }, [lastSent, sent]);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'auto', block: 'end' });
    }
  };

  return (
    <div className="w-screen flex flex-col justify-center items-center h-screen bg-gray-100">
      <div className="h-5/6 w-3/4 bg-gray-200 p-6 flex flex-col justify-between rounded-lg shadow-lg overflow-hidden">
        {selectedFriend === '' ? (
          <div className="flex justify-center items-center h-full">
            <div className="text-3xl text-gray-500">
              Select a friend to Start a Conversation
            </div>
          </div>
        ) : (
          <div
            className="flex flex-col space-y-4 overflow-y-auto p-4"
            style={{ maxHeight: 'calc(100% - 60px)' }}
          >
            {messages.map((message, index) => (
              <Message key={index} msg={message.msg} Me={message.me} />
            ))}
            <div ref={messagesEndRef} />{' '}
            {/* This div ensures auto-scrolling to bottom */}
          </div>
        )}

        <Input />
      </div>
    </div>
  );
}

export default Chatbox;
