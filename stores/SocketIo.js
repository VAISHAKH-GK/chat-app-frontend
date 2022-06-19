import { createContext, useState, useContext, useEffect } from 'react';
import { Context } from './Context';


export const Socket = createContext();

export default function SocketProvider({ children }) {

  const { user, dmUser } = useContext(Context);
  const [socket, setSocket] = useState();

  const sendMessageToServer = (message) => {
    if (user && dmUser && message) {
      socket.emit("message", message);
    }
  }

  return (
    <Socket.Provider value={{ socket, setSocket, sendMessageToServer }} >
      {children}
    </Socket.Provider>
  )

}
