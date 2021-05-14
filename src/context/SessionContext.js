import React, {useState} from 'react';
import {useLocation} from 'wouter';

const Context = React.createContext({});

export function SessionContextProvider ({children}) {
    const user = JSON.parse(window.localStorage.getItem('loggedAutoCvAppUser')) || null;
    const [session, setSession] = useState(user);
    const [location, setLocation] = useLocation();

    return <Context.Provider value={{session, setSession}}>
        {/* {session ? children : setLocation('/auth')} */}
        {children}
    </Context.Provider>
}

export default Context;