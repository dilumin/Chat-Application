import { Button, Modal } from 'flowbite-react';
import { useState, useContext } from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import React from 'react';
import photoAdd from './add_photo_alternate_outlined.svg';
import useAxiosInstanceForm from '../../../hooks/useAxiosInstanceForm';
import HomeContext from '../../../context/HomeProvider';

function PhotoUpload() {
  const [openModal, setOpenModal] = useState(false);
  const [image, setImage] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [content, setContent] = useState('');
  const axiosInstance = useAxiosInstanceForm();
  const { MyInfo } = useContext(HomeContext);
  // MyInfo.email = 5;

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);

    // convert th IMAGE TO URL
    const url = URL.createObjectURL(file);
    setImgUrl(url);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('content', content);
    formData.append('email', MyInfo.email);
    axiosInstance
      .post('/addPhoto', formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log('FILE DID NOT UPLOAD', err);
      });
  };
  const handleChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <>
      <button
        className="  rounded-lg p-2 hover:bg-slate-200 transition-colors ease-in-out "
        onClick={() => setOpenModal(true)}
      >
        <img src={photoAdd} alt="" />
      </button>
      <Modal
        show={openModal}
        size="3xl"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Upload a Photo
            </h3>

            <textarea
              value={content}
              onChange={handleChange}
              placeholder="What's on your mind?"
              className="input border w-3/4 h-24 focus:outline-none resize-none overflow-hidden mb-4"
              rows={1}
              // style={{ minHeight: '40px' }}
            />

            <div className="flex justify-center mb-4">
              <img className="" src={imgUrl} alt="" width={300} />{' '}
            </div>

            <input type="file" onChange={handleImage} className="mb-6" />

            <div className="flex justify-center gap-4">
              <Button
                color="blue"
                onClick={() => {
                  setOpenModal(false);
                  handleUpload();
                }}
              >
                Share
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PhotoUpload;
