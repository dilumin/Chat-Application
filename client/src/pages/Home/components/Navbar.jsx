import React, { useState, useEffect, useRef } from 'react';
import HomeContext from '../../../context/HomeProvider';
import { useContext } from 'react';
import './Navbar.css';
import chat from './chat-svgrepo-com (1).svg';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [search, setSearch] = useState('');
  const { profileDropDown, setProfileDropDown, MyInfo, friends } =
    useContext(HomeContext);
  const navigate = useNavigate();

  const profileRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropDown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileDropDown, setProfileDropDown]);

  return (
    <div>
      <div className="navbar-con w-full bg-slate-300 h-16 flex items-center justify-between px-4">
        <div className="logo text-black font-bold text-xl">PhotoNia</div>
        <div className="flex-1 flex justify-center">
          <div className="input-con w-2/5 bg-white rounded-lg">
            <input
              type="text"
              placeholder="Search"
              className="input  w-full focus:outline-none "
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="profile-con flex items-center relative">
          <div className="">
            <img
              onClick={() => {
                navigate('/dashboard');
              }}
              src={chat}
              alt=""
              className="w-6 h-6 cursor-pointer mr-6"
            />
          </div>
          <div
            className="profile bg-black w-10 h-10 rounded-full border border-black cursor-pointer"
            onClick={() => setProfileDropDown(!profileDropDown)}
          ></div>
        </div>
      </div>
      {profileDropDown && (
        <div
          ref={profileRef} // Attach the ref to the dropdown
          className="fixed right-0 border-solid bg-slate-500 border-black rounded w-24 p-1"
        >
          <div className="chec border-black cursor-pointer p-2 text-white">
            Profile
          </div>
          <div className="chec border-black cursor-pointer p-2 text-white">
            Sign Out
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
