import React from 'react';
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon
}
from 'mdb-react-ui-kit';
import { Navigate, useNavigate , useLocation } from 'react-router-dom';
import AuthContext from '../../context/AuthProvider'
import { useContext, useEffect } from 'react';


import { useState } from 'react';

function Login() {

    
    const {Auth , setAuth} = useContext(AuthContext);

    useEffect(() => {
        if (Auth.accessToken) {
            navigate('/dashboard');
        }} , [Auth] );
    

    const goToReg = () => {
        navigate('/register');
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            // const response = await fetch('http://localhost:3500/login', {
            const response = await fetch('https://testserver-arap.onrender.com/login', {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include', 
                body: JSON.stringify({email, password})
            });
            const data = await response.json();

            if (data.Status === "Success") {
                setAuth({accessToken : data.AccessToken});
                localStorage.setItem('accessToken', data.AccessToken);
                navigate(  location.state?.from || { pathname: '/Dashboard' } , { replace: true });
            }
            else{
                alert("User login failed" , data?.message)
                console.log(data);
                console.log("User login failed");
            }
        } catch (err) {
            console.error("Error while POSTING in handle submit ",err);      
        }
    }


  return (
    <div className="flex items-center justify-center h-screen">
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
        <form onSubmit={handleSubmit}>
            <MDBInput onChange={(e) => setEmail(e.target.value)} wrapperClass='mb-4' label='Email address' id='form1' type='text'/>
            <MDBInput onChange={(e) => setPassword(e.target.value)} wrapperClass='mb-4' label='Password' id='form2' type='password'/>

            <div className="d-flex justify-content-between mx-3 mb-4">
                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                <a href="!#">Forgot password?</a>
            </div>

            <MDBBtn type='submit' className="mb-4">Sign in</MDBBtn>
        </form>

        <div className="text-center">
            <p>Not a member? <button onClick={goToReg} >Register</button></p>
            
        </div>

        
        </MDBContainer>
    </div>
  );
}

export default Login;