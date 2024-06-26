
import { ListGroup } from "flowbite-react";
import React, { useEffect , useState } from 'react'
import { useContext } from 'react';
import  DashboardContext  from "../../../context/DashboardProvider";
import useAxiosInstance from '../../../hooks/useAxiosInstance';



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
    
    
  return (
    <div>
        <div className="flex justify-center">
      <ListGroup className="w-48">

        {friends.map((friend) => (
            <ListGroup.Item>{friend}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
    </div>
  )
}

export default ShowFriends

