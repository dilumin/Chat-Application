import React, { useEffect, useContext } from 'react';
import DashboardContext from '../../../context/DashboardProvider';
import useAxiosInstance from '../../../hooks/useAxiosInstance';
import AddFriends from './AddFriends';
import MessageContext from '../../../context/MessageProvider';
import { Sidebar } from 'flowbite-react';
import { HiUser, HiLogout } from 'react-icons/hi';
import { SocketContext } from '../../../context/SocketContext';

function ShowFriends() {
  const { socket } = useContext(SocketContext);
  const axiosInstance = useAxiosInstance();
  const { MyInfo, friends, setFriends } = useContext(DashboardContext);
  const MyEmail = MyInfo.email;
  const { selectedFriend, setSelectedFriend, refresh, setRefresh } =
    useContext(MessageContext);

  // Fetch friends list from server
  const getFriends = async () => {
    try {
      const res = await axiosInstance.post('/getFriends', { email: MyEmail });
      setFriends(res.data.friends);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  useEffect(() => {
    getFriends();
  }, [MyEmail]);

  // Handle logout
  const handleLogout = async () => {
    localStorage.removeItem('accessToken');
    window.location.reload(); // Reloading page to reset state
    try {
      await axiosInstance.post('/logout', { email: MyEmail });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Listen for friend request acceptance
  useEffect(() => {
    if (socket) {
      socket.on('friendRequestAccepted', (data) => {
        // Update friends list when a friend request is accepted
        setFriends((prevFriends) => [...prevFriends, data.email]);
      });
    }
    return () => {
      if (socket) {
        socket.off('friendRequestAccepted');
      }
    };
  }, [socket, setFriends]);

  return (
    <div className=" top-0 left-0">
      <Sidebar aria-label="Sidebar with logo branding example">
        <Sidebar.Logo>
          <div className="text-lg">Chat App</div>
        </Sidebar.Logo>
        <h1>{MyInfo?.username}</h1>
        <AddFriends />
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            {friends.map((friend) => (
              <Sidebar.Item
                key={friend}
                onClick={() => {
                  setSelectedFriend(friend);
                  console.log('SELECTED FRIEND CHANGED', friend);
                  setRefresh((prev) => !prev);
                }}
                icon={HiUser}
              >
                {friend}
              </Sidebar.Item>
            ))}
            <Sidebar.Item onClick={handleLogout} icon={HiLogout}>
              Log Out
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}

export default ShowFriends;
