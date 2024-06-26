// Dashboard.jsx
import React, { useContext } from 'react';
import ContactList from './components/ContactList';
import AddFriends from './components/AddFriends';
import AcceptFriend from './components/AcceptFriend';
import ShowFriends from './components/ShowFriends';
import Test1 from './components/Test1';
import DashboardContext, { DashboardProvider } from '../../context/DashboardProvider';
import Chatbox from './components/Chatbox';

const Dashboard = () => {
    const { MyInfo } = useContext(DashboardContext);

    return (
        <div>
            <h1>{MyInfo.username}</h1>
            {/* <Test1 /> */}
            <AcceptFriend />
            <Chatbox />
            

            {/* <AddFriends /> */}
            {/* Uncomment as needed */}
            <ShowFriends />
            {/* <ContactList /> */}
        </div>
    );
};

const DashboardWrapper = () => (
    <DashboardProvider>
        <Dashboard />
    </DashboardProvider>
);

export default DashboardWrapper;
