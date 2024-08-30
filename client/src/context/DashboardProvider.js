import React, { createContext, useEffect, useState } from 'react';
import useAxiosInstance from '../hooks/useAxiosInstance';

const DashboardContext = createContext();

// Create a provider component
export const DashboardProvider = ({ children }) => {
    const axiosInstance = useAxiosInstance();
    const [MyInfo, setMyInfo] = useState({});
    const [friends , setFriends] = useState([]);



    const getEmail = async () => {
        const accessToken = localStorage.getItem('accessToken');
        await axiosInstance.post('/myinfo', { accessToken }).then((res) => setMyInfo(res?.data));
    };


    useEffect(() => {
        getEmail();
    }, []);

    
  return (
    <DashboardContext.Provider value={{ MyInfo , setMyInfo , friends , setFriends  }}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardContext;