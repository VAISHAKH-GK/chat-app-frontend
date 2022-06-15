import { createContext, useState, useContext, useEffect } from 'react';
import { Context } from './Context';


export const Socket = createContext();

export default function SocketProvider({ children }) {

  const { addMessage, user } = useContext(Context);
  const [socket, setSocket] = useState();

  const sendMessageToServer = (message) => {
    socket.emit("message", message);
  }

  useEffect(() => {
    if (socket && user) {
      socket.on(`message${user._id}`, (msg) => {
        console.log("once")
        addMessage(msg);
      });
    }
  }, [socket, user]);

  return (
    <Socket.Provider value={{ socket, setSocket, sendMessageToServer }} >
      {children}
    </Socket.Provider>
  )

}
