import { createContext, useState, useContext } from 'react';


export const Socket = createContext();

export default function SocketProvider({ children }) {

  const [socket, setSocket] = useState();

  const sendMessageToServer = (message) => {
    socket.emit("message", message);
  }

  return (
    <Socket.Provider value={{ socket, setSocket, sendMessageToServer }} >
      {children}
    </Socket.Provider>
  )

}
