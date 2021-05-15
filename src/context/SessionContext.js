import React, {useState} from 'react';

const Context = React.createContext({});

export function SessionContextProvider ({children}) {
    const user = JSON.parse(window.localStorage.getItem('loggedAutoCvAppUser')) || null;
    const [session, setSession] = useState(user);
    return <Context.Provider value={{session, setSession}}>
        {children}
    </Context.Provider>
}

export default Context;