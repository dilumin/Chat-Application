import React, { createContext, useEffect, useState } from 'react';
import useAxiosInstance from '../hooks/useAxiosInstance';

const DashboardContext = createContext();

// Create a provider component
export const DashboardProvider = ({ children }) => {
    const axiosInstance = useAxiosInstance();
    const [MyInfo, setMyInfo] = useState({});


    const getEmail = async () => {
        const accessToken = localStorage.getItem('accessToken');
        const res = await axiosInstance.post('/myinfo', { accessToken }).then((res) => setMyInfo(res.data));
    };


    useEffect(() => {
        getEmail();
    }, []);

    
  return (
    <DashboardContext.Provider value={{ MyInfo , setMyInfo  }}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardContext;