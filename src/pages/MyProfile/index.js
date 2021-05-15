import React, {useContext} from 'react';
import SessionContext from '../../context/SessionContext';

const MyProfile = () => {
    const {session} = useContext(SessionContext);
    return (
        <>
            <h1>This is the user profile page</h1>
            <h2>You are logged in as {session.name + ' ' + session.lastName}</h2>
            
        </>
    );
}

export default MyProfile;