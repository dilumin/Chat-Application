import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';


import { useState } from 'react';


function App() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const navigate = useNavigate();
    


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== password2) {
            alert("Passwords do not match");
            return;
        }

        try{
            const response = await fetch('http://localhost:3500/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, email, password})
            });
            const data = await response.json();
            if (data.Status === "Success") {
                console.log("User registered successfully");
                navigate('/login');
            }else{
                alert("User registration failed" , data?.message)
                console.log(data);
                console.log("User registration failed");
            }


        } catch (err) {
            console.error("Error while POSTING in handle submit ",err);      
        }
    };
    const goToReg = () => {
        navigate('/login');
    }


  return ( 
    
    <div className='flex items-center justify-center h-screen'>
        <MDBContainer fluid>

        <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
            <MDBCardBody>
            <MDBRow>
                <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
            
            <form onSubmit={handleSubmit}>
                <div className="d-flex flex-row align-items-center mb-4 ">
                    <MDBIcon fas icon="user me-3" size='lg'/>
                    <MDBInput onChange={(e) => setUsername(e.target.value)} label='Username' id='form1' type='text' className='w-100'/>
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="envelope me-3" size='lg'/>
                    <MDBInput label='Your Email' id='form2' type='text' onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="lock me-3" size='lg'/>
                    <MDBInput label='Password' id='form3' type='password' onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="key me-3" size='lg'/>
                    <MDBInput label='Repeat your password' id='form4' type='password' onChange={(e) => setPassword2(e.target.value)}/>
                </div>


                <MDBBtn  type='submit' className='mb-4' size='lg'>Register</MDBBtn>
                <div className="text-center">
            <p>Already a member? <button onClick={goToReg} >Login</button></p>
            
        </div>
            
                </form>
                </MDBCol>

                <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid/>
                </MDBCol>

            </MDBRow>
            </MDBCardBody>
        </MDBCard>

        </MDBContainer>
    </div>
  );
}

export default App;