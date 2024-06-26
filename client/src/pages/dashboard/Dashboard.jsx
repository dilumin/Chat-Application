// Dashboard.jsx
import React, { useContext } from 'react';
import ContactList from './components/ContactList';
import AddFriends from './components/AddFriends';
import AcceptFriend from './components/AcceptFriend';
import ShowFriends from './components/ShowFriends';
import DashboardContext, { DashboardProvider } from '../../context/DashboardProvider';

const Dashboard = () => {
    const { MyInfo } = useContext(DashboardContext);

    return (
        <div>
            <h1>{MyInfo.username}</h1>
                       
            <AcceptFriend />
            <AddFriends />
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
