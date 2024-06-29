import React, { useEffect } from 'react'
import useAxiosInstance from '../../../hooks/useAxiosInstance'; 
import AuthContext from '../../../context/AuthProvider';
import { useContext , useState } from 'react';

function ContactList() {
    const axiosInstance = useAxiosInstance();
    const { Auth, setAuth } = useContext(AuthContext);
    const email = Auth?.email;
    const [friends, setFriends] = useState([]);

    const getData = async () => {
        try {
            const res = await axiosInstance.post('/reqFriends', { "email":"2" });
            console.log("Here is the Auth", Auth);
            setFriends( res.data.friends)
            console.log('Response:', friends);
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    }; 
    useEffect(() => {
        getData();
    }, []);


  return (
    <div>
        <ul className="menu bg-base-200 rounded-box w-56">
            <button onClick={getData} > Refresh </button>
            {friends.map((friend) => (
                <li><a>{friend?.username}</a></li>))
            }

        </ul>
    </div>
  )
}

export default ContactList