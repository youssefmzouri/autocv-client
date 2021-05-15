import React, {useContext} from 'react';
import {Route, Redirect} from 'wouter';
import SessionContext from '../context/SessionContext';

const RouteProtected = props => {
    const {session} = useContext(SessionContext);
    if( session === null ) {
        return <Redirect to="/login"/>;
    }
    return <Route {...props} />;
};

export default RouteProtected;