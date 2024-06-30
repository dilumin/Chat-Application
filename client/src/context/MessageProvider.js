import React, { useEffect } from "react";
import { useContext , useState , createContext } from "react";
import useAxiosInstance from "../hooks/useAxiosInstance";

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {

    const [messages, setMessages] = useState([]);
    const [selectedFriend, setSelectedFriend] = useState("");
    const axiosInstance = useAxiosInstance();
    const [lastSent , setLastSent] = useState("");
    const [refresh , setRefresh] = useState(false);
    const [sent , setSent] = useState(false);



    return (
        <MessageContext.Provider value={{ messages, setMessages , selectedFriend , setSelectedFriend , lastSent , setLastSent , refresh , setRefresh , sent , setSent  }}>
            {children}
        </MessageContext.Provider>
    );
}

export default MessageContext;



// import React, { useState, createContext } from "react";
// import useAxiosInstance from "../hooks/useAxiosInstance";

// const MessageContext = createContext();

// export const MessageProvider = ({ children }) => {
//   const [messages, setMessages] = useState([]);
//   const [selectedFriend, setSelectedFriend] = useState("");
//   const [lastSent, setLastSent] = useState("");
//   const [refresh, setRefresh] = useState(false);

//   return (
//     <MessageContext.Provider value={{
//       messages, setMessages, selectedFriend, setSelectedFriend, lastSent, setLastSent, refresh, setRefresh
//     }}>
//       {children}
//     </MessageContext.Provider>
//   );
// }

// export default MessageContext;
