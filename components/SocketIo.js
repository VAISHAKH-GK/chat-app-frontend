import { createContext, useState, useEffect } from 'react';


export const Socket = createContext();


export default function SocketProvider({ children }) {

  const [socket, setSocket] = useState();

  useEffect(() => {
    console.log("test")
    if (socket) {
      socket.on("connect", () => {
        console.log("connected to server using socket io");
      });
    }
  }, [socket]);

  return (
    <div>
      <h1 style={{color:"red"}} >HAI</h1>
      <Socket.Provider value={{ socket, setSocket }} >
        {children}
      </Socket.Provider>
    </div>
  )

}
