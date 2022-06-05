import { createContext , useState , useEffect } from 'react';
import io from 'socket.io-client';


export const Socket = createContext();

export default function SocketProvider ({children}) {

  useEffect(() => {
    const socket = io("http://localhost:9000");
    socket.on("connect",() => {
      console.log("connected to server with socketio");
    });
  },[]);

  return (
    <Socket.Provider value={{}} >
      {children}
    </Socket.Provider>
  )

}
