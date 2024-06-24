import { createContext , useState } from "react";
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    
    const [Auth, setAuth] = useState({accessToken : ""});
//get token from local storage
    const getAccessToken = () => {
        return localStorage.getItem('accessToken') || false;
    }

    if (Auth.accessToken === "") {
        if (getAccessToken()) {
            setAuth({accessToken : getAccessToken()});
        }else{
            console.log("No Token in Local Storage so log in Again")
        }
    }
    return (
        <AuthContext.Provider value={{Auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
   
}

export default AuthContext;


