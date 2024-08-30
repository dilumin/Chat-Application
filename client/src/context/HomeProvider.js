import React, { createContext, useEffect, useState } from 'react';
import useAxiosInstance from '../hooks/useAxiosInstance';

const HomeContext = createContext();

// Create a provider component
export const HomeProvider = ({ children }) => {
    const axiosInstance = useAxiosInstance();
    const [MyInfo, setMyInfo] = useState({});
    const [friends , setFriends] = useState([]);
    const [profileDropDown, setProfileDropDown] = useState(false);




    const getEmail = async () => {
        const accessToken = localStorage.getItem('accessToken');
        await axiosInstance.post('/myinfo', { accessToken }).then((res) => setMyInfo(res?.data));
    };

    const getFriends = async () => {
        try {
          const res = await axiosInstance.post('/getFriends', { email: MyInfo.email });
          setFriends(res.data.friends);
        } catch (error) {
          console.error('Error fetching contacts:', error);
        }
      }


    useEffect(() => {
        getEmail();
        getFriends();
    }, []);

    
  return (
    <HomeContext.Provider value={{ MyInfo , setMyInfo , friends , setFriends , profileDropDown , setProfileDropDown }}>
      {children}
    </HomeContext.Provider>
  );
};

export default HomeContext;