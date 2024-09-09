import React, { useState } from 'react';
import close from './icons8-close-30.svg';
import './addPosts.css';
import open1 from './pencil-svgrepo-com.svg';
import useAxiosInstance from '../../../hooks/useAxiosInstance';
import { useContext } from 'react';
import HomeContext from '../../../context/HomeProvider';
import PhotoUpload from './PhotoUpload';

function Addposts() {
  const [content, setContent] = useState('');
  const [openAddPost, setOpenAddPost] = useState(false);
  const axiosInstance = useAxiosInstance();
  const { MyInfo } = useContext(HomeContext);
  const [opened, setOpened] = useState(false);

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const HandlePost = async () => {
    try {
      const res = await axiosInstance.post('/addPost', {
        email: MyInfo.email,
        post: content,
      });
      setContent('');
      console.log(res);
    } catch (err) {
      console.log('Could not Post', err);
    }
  };

  const HandlePhoto = async () => {};

  return (
    <div className="ml-7 mr-7">
      <div className="pt-3 pb-3 flex">
        <div
          className="flex-initial flex justify-center bg-white w-10 h-10 hover:bg-slate-200 rounded-full border-2 border-black "
          onClick={() => setOpenAddPost(!openAddPost)}
        >
          {openAddPost ? (
            <img src={close} className="items-center bg-center w-5  " alt="" />
          ) : (
            <img
              src={open1}
              className="items-center bg-center w-5 transition-all ease-in"
              alt=""
            />
          )}
        </div>
        {/* {openAddPost && */}
        <div className="w-full flex">
          <div
            className={`justify-center w-full transition-all flex ease-in ${
              openAddPost ? '' : 'hell'
            }`}
            // style={{ d }}
          >
            <textarea
              value={content}
              onChange={handleChange}
              placeholder="What's on your mind?"
              className="input border w-2/3 h-24 focus:outline-none resize-none overflow-hidden"
              rows={1}
              // style={{ minHeight: '40px' }}
            />
            <div className="flex flex-col justify-center ml-4">
              <PhotoUpload />
            </div>
            <div className="flex flex-col justify-center ml-4">
              <button
                className=" border-2 border-stone-950 rounded-lg p-2 hover:bg-slate-200 transition-colors ease-in-out "
                onClick={HandlePost}
              >
                Share
              </button>
            </div>
          </div>
        </div>

        {/* } */}
      </div>
    </div>
  );
}

export default Addposts;
