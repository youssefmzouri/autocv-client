import React, {useContext} from 'react';
import SessionContext from '../../context/SessionContext';
import SubPage from '../../components/SubPage';



const MyProfile = () => {
    const {session} = useContext(SessionContext);
    return (
        <div className="profileContainer">
            <SubPage>
                <h1>This is the user profile page</h1>
                <h2>You are logged as {session.name + ' ' + session.lastName}</h2>   
            </SubPage>
        </div>
    );
}

export default MyProfile;