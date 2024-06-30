// Dashboard.jsx
import React, { useContext } from 'react';
import ContactList from './components/ContactList';
import AddFriends from './components/AddFriends';
import AcceptFriend from './components/AcceptFriend';
import ShowFriends from './components/ShowFriends';
import Test1 from './components/Test1';
import DashboardContext, { DashboardProvider } from '../../context/DashboardProvider';
import Chatbox from './components/Chatbox';
import { MessageProvider } from '../../context/MessageProvider';

const Dashboard = () => {
    const { MyInfo } = useContext(DashboardContext);

    return (
        <div>
            
            {/* <Test1 /> */}
            <AcceptFriend />
            <div className='flex' >
                <ShowFriends />
                <Chatbox />

            </div>
            
            

            {/* <AddFriends /> */}
            {/* Uncomment as needed */}
            
            
            {/* <ContactList /> */}
        </div>
    );
};

const DashboardWrapper = () => (
    <DashboardProvider>
        <MessageProvider>
            <Dashboard />
        </MessageProvider>   
            
    </DashboardProvider>
);

export default DashboardWrapper;
