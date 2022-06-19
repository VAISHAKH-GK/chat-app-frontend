import { createContext, useEffect, useState, useContext } from 'react';

export const Context = createContext();


export default function ContextProvider({ children }) {

  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [dmUser, setDmUser] = useState();
  const [messages, setMessages] = useState([]);

  const addMessage = (newMessage) => {
    setMessages((allMessages) => [...allMessages, newMessage]);
  }

  const changeDmUser = (user) => {
    setDmUser(user);
  }

  useEffect(() => {
    setMessages([]);
  }, [dmUser]);

  const deleteDatas = () => {
    setUser(null);
    setUsers([]);
    setDmUser(null);
    setMessages([]);
  }

  return (
    <Context.Provider value={{ user, setUser, users, setUsers, dmUser, setDmUser, messages, setMessages, addMessage, changeDmUser, deleteDatas }} >
      {children}
    </Context.Provider>
  )

}

