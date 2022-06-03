import { createContext , useState } from 'react';



export const Context = createContext();



export default function ContextProvider ({children}) {

  const [user , setUser] = useState(null);
  const [users , setUsers] = useState([]);
  const [dmUser , setDmUser]= useState();

  return (
    <Context.Provider value={{user,setUser,users,setUsers,dmUser,setDmUser}} >
      {children}
    </Context.Provider>
  )

}

