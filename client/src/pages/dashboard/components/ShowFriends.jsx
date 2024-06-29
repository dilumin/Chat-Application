
import React, { useEffect  } from 'react'
import { useContext } from 'react';
import  DashboardContext  from "../../../context/DashboardProvider";
import useAxiosInstance from '../../../hooks/useAxiosInstance';
import AddFriends from './AddFriends';



import { Sidebar } from "flowbite-react";
import {  HiUser , HiLogout } from "react-icons/hi";
import { SocketContext } from '../../../context/SocketContext';



function ShowFriends() {
  const {socket} = useContext(SocketContext);
    const axiosInstance = useAxiosInstance();
    const { MyInfo ,friends , setFriends } = useContext(DashboardContext);
    const Myemail = MyInfo.email;

    const getFriends = async () => {
        try {
            const res = await axiosInstance.post('/getFriends', { "email":Myemail });
            console.log('ALL FRIENDS AREE:', res.data.friends);
            setFriends(res.data.friends);
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }}

        useEffect(() => {
            getFriends();           
        }, [Myemail]);

        const handleLogout = async () => { 
            localStorage.removeItem('accessToken');
            window.location.reload();
            try{
             await axiosInstance.post('/logout', { "email":Myemail });
            }catch (error) {
                console.error('Error fetching loging out:', error);
            }
        }

        useEffect(() => {
          if (socket) {
            socket.on('friendRequestAccepted', (data) => {
              console.log("Friend request received", data);
              setFriends([...friends, data.email]);
              console.log("ALL", friends);
            });
          }
          // Clean up the event listener when component unmounts
          return () => {
            if (socket) {
              socket.off('friendRequestAccepted');
            }
          };
        }, [socket]);
    
    
  return (
    <div className="fixed top-0 left-0 " >
        <div className="">
              <div> <Sidebar aria-label="Sidebar with logo branding example">

        <Sidebar.Logo >
            <div className='text-lg' > ChaT APP</div>
        </Sidebar.Logo>
        <AddFriends />
        <Sidebar.Items>
          <Sidebar.ItemGroup>

            {friends.map((friend) => (
              <Sidebar.Item href="#" icon={HiUser}>
              {friend}
            </Sidebar.Item>
            ))}            
            <Sidebar.Item onClick= {handleLogout} icon={HiLogout}>
              Log Out
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
        </Sidebar></div>





    </div>
    </div>
  )
}

export default ShowFriends

