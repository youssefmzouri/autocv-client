import React, {useContext} from 'react';
import {Route} from 'wouter';
import SessionContext from '../context/SessionContext';
import Auth from '../pages/Auth';

const RouteProtected = ({path, component}) => {
    const {session} = useContext(SessionContext);
    return (
        <>
            {
                session ?
                    <Route path={path} component={component} />
                : 
                    <Route path={"/auth"} component={Auth} />
            }
        </>        
    )
}

export default RouteProtected;