import { createContext, useState } from 'react';


export const Context = createContext();


export default function ContextProvider({ children }) {

  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [dmUser, setDmUser] = useState();
  const [messages, setMessages] = useState([]);

  const addMessage = (newMessage) => {
    setMessages((allMessages) => [...allMessages, newMessage]);
  }

  return (
    <Context.Provider value={{ user, setUser, users, setUsers, dmUser, setDmUser, messages, setMessages, addMessage }} >
      {children}
    </Context.Provider>
  )

}

