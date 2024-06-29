import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useState  } from "react";
import { ListGroup } from "flowbite-react";
import { useContext , useEffect } from "react";
import useAxiosInstance from '../../../hooks/useAxiosInstance'; 
import { HiOutlineArrowRight } from "react-icons/hi";
import { SocketContext } from "../../../context/SocketContext";
import  DashboardContext  from "../../../context/DashboardProvider";




const  AddFriends = () => {
  
  const [openModal, setOpenModal] = useState(false);
  const { MyInfo , friends , setFriends} = useContext(DashboardContext);
  
  const [email, setEmail] = useState('');
//   setEmail(MyInfo.email);
  const [searchResults, setSearchResults] = useState([]);
  const [selected , setSelected] = useState(false);
  const axiosInstance = useAxiosInstance();
  const {socket} = useContext(SocketContext);


  function onCloseModal() {
    setOpenModal(false);
    setSelected(false);
    setEmail('');
    setSearchResults([]);
    setEmail('');
  }

  const getPeople = async (email) => {
    try{
        const res = await axiosInstance.post('/getPerson', { "email":email });
        setSearchResults(res.data?.people[0])
    }catch (error) {
        console.error('Error fetching contacts:', error );
}}

    //send the friend request using socket IO
    const sendFriendRequest = async (email) => {
        try{
            console.log("This is the socket ",socket)
        socket.emit('sendFriendRequest', { email: email });
        }
        catch (error) {
            console.error('Error sending friend request:', error);
        }
    }

    
    

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Add New</Button>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
        {!selected? 
        <div>
            <div className="space-y-6">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">Add new Friends</h3>
                <div>
                <div className="mb-2 block">
                    <Label htmlFor="email" value="Enter their Email" />
                </div>
                <TextInput
                    id="email"
                    placeholder="name@sample.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                />
                </div>
                <div className="w-full">
                <Button onClick={ ()=>  {
                    getPeople(email)
                }


                } >Search</Button>
                </div>

                <div>
                    <div className="flex justify-center">
                        <ListGroup className="w-80">
                            
                            <ListGroup.Item onClick={() => setSelected(true)} >  {searchResults.username} </ListGroup.Item>
                            
                        </ListGroup>
                    </div>
                </div>
            </div>
        </div> :
        <div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Send Friend Request to {searchResults.username}</h3>
            <Button onClick={()=> {
                sendFriendRequest(searchResults.email);
                setSelected(false);
                setEmail('');
                setOpenModal(false);
                setSearchResults([]);
                }
            }>
                Send
                <HiOutlineArrowRight className="ml-2 h-5 w-5" />
            </Button>
        </div>
        }
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddFriends;
