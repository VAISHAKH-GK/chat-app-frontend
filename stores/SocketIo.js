import { createContext, useState, useContext, useEffect } from 'react';
import { Context } from './Context';


export const Socket = createContext();

export default function SocketProvider({ children }) {

  const { addMessage, user, dmUser } = useContext(Context);
  const [socket, setSocket] = useState();

  const sendMessageToServer = (message) => {
    if (user && dmUser && message) {
      socket.emit("message", message);
    }
  }

  useEffect(() => {
    if (socket && user && dmUser) {
      socket.on(`message${user._id}`, (msg) => {
        console.log(dmUser);
        console.log("once")
        addMessage(msg);
      });
    }
  }, [socket, user, dmUser]);

  return (
    <Socket.Provider value={{ socket, setSocket, sendMessageToServer }} >
      {children}
    </Socket.Provider>
  )

}
