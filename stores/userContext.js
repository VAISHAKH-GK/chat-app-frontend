import { createContext , useState } from 'react';



export const UserContext = createContext();



export default function UserContextProvider ({children}) {

  const [user , setUser] = useState(null);
  const [users , setUsers] = useState([]);

  return (
    <UserContext.Provider value={{user,setUser,users,setUsers}} >
      {children}
    </UserContext.Provider>
  )

}

