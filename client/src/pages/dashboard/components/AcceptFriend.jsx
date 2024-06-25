import React, { useEffect , useContext , useState } from 'react'
import { Dropdown } from "flowbite-react";
import  DashboardContext  from '../../../context/DashboardProvider';
import { SocketContext } from '../../../context/SocketContext';
import useAxiosInstance from '../../../hooks/useAxiosInstance';


function AcceptFriend() {

    const { MyInfo } = useContext(DashboardContext);
    const myEmail = MyInfo.email;

    const axiosInstance = useAxiosInstance();
    const {socket} = useContext(SocketContext);
    // const { addFriend ,  friendsRequests } = useContext(DashboardContext);

    const getAllFriends = async () => {
        try {
            const res = await axiosInstance.post('/reqFriends', { "email":myEmail });
            console.log('ALL FRIENDS AREE:', res.data.friends);
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }}


    const [friendsRequests, setFriendRequests] = useState([]);
    const getRequestsfromDB = async () => {
        try {
            const res = await axiosInstance.post('/getFriendRequests', { "email":myEmail });
            console.log('Response from request:', res.data);
            setFriendRequests(res.data);
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    }

    useEffect(() => {
        getRequestsfromDB();
    }, []);
    useEffect(() => {
        getAllFriends();
    }, [friendsRequests]);

    useEffect(() => {
        if (socket) {
          socket.on('friendRequest', (data) => {
            console.log("Friend request received", data);
            setFriendRequests([...friendsRequests, data.email]);
            console.log("ALL", friendsRequests);
          });
        }
        // Clean up the event listener when component unmounts
        return () => {
          if (socket) {
            socket.off('friendRequest');
          }
        };
      }, [socket]);
    
    const addFriend = async (Oemail , accepted) => {
        try {
            const res = await axiosInstance.post('/acceptFriendRequest', { myEmail ,Oemail , accepted });
            console.log('RESPOSE FROM ADD FRIEND:', res);
            setFriendRequests(friendsRequests.filter((friend) => friend !== Oemail));
        } catch (error) {
            console.error('Error sending POST request:', error);
        }
    }

  return (
    <div className='fixed top-0 right-0 m-4' >
        <Dropdown label="+">
        <Dropdown.Header>
            <span className="font-bold text-sm">Friend Requests</span>
        </Dropdown.Header>

        {friendsRequests.map((friend) => (
            
            <Dropdown.Item>{friend} 
            <button type="button" onClick={() =>{ addFriend(friend , true) }} class="text-white bg-blue-700 hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 ml-4 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Accept</button>
            <button type="button" onClick={() =>{ addFriend(friend , false) }} class="text-white bg-red-800 hover:bg-red-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Reject</button>
            </Dropdown.Item>))
        }
        {/* <Dropdown.Item>Dashboard</Dropdown.Item>
        <Dropdown.Item>Settings</Dropdown.Item>
        <Dropdown.Item>Earnings</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item>Sign out</Dropdown.Item> */}
        </Dropdown>

    </div>
  )
}

export default AcceptFriend