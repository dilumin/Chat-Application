
import { ListGroup } from "flowbite-react";
import React, { useEffect , useState } from 'react'
import { useContext } from 'react';
import  DashboardContext  from "../../../context/DashboardProvider";
import useAxiosInstance from '../../../hooks/useAxiosInstance';
import AddFriends from './AddFriends';



import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards , HiLogout } from "react-icons/hi";



function ShowFriends() {

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
            const res = await axiosInstance.post('/logout', { "email":Myemail });
            }catch (error) {
                console.error('Error fetching loging out:', error);
            }
        }
    
    
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

