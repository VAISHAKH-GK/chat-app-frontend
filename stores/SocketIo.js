import { createContext, useState, useEffect } from 'react';


export const Socket = createContext();


export default function SocketProvider({ children }) {

  const [socket,setSocket] = useState();

  const sendMessage = (message) => {
    socket.emit("message",message);
  }

  return (
    <Socket.Provider value={{socket,setSocket,sendMessage}} >
      {children}
    </Socket.Provider>
  )

}
