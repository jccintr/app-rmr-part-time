import { createContext,useState } from "react";

const DataContext = createContext({});

export const DataProvider = ({children}) => {
    const [loggedUser,setLoggedUser] = useState(null);
    const [expoPushToken, setExpoPushToken] = useState('');
    const [apiToken, setApiToken] = useState('');
    const [orcamento,setOrcamento] = useState(null);
   
   return (
    <DataContext.Provider value={{loggedUser, setLoggedUser,setExpoPushToken,expoPushToken,apiToken,setApiToken,orcamento,setOrcamento}}>
      {children}
    </DataContext.Provider>
)
}

export default DataContext;