import React from 'react'
import { useLocation , Navigate , Outlet } from "react-router-dom";
import { useContext  } from "react";
import AuthContext from "../context/AuthProvider";

const RequireAuth = () => {

    const {Auth} = useContext(AuthContext);
    const location = useLocation();

    return (
        Auth?.accessToken ? <Outlet /> : <Navigate to="/login" state={{from : location}} replace />
    )


}

export default RequireAuth;

