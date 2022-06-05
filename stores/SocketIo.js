import { createContext, useState, useEffect } from 'react';
import io from 'socket.io-client';


export const Socket = createContext();

export default function SocketProvider({ children }) {
  const [socket] = useState(io("http://localhost:9000"));

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected to server with socketio");
    });
  }, []);

  return (
    <Socket.Provider value={{socket}} >
      {children}
    </Socket.Provider>
  )

}
