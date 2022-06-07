import { createContext, useState, useEffect } from 'react';


export const Socket = createContext();


export default function SocketProvider({ children }) {

  const [socket,setSocket] = useState();

  return (
    <Socket.Provider value={{socket,setSocket}} >
      {children}
    </Socket.Provider>
  )

}
