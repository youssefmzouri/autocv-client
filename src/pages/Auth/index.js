import React, {useContext} from 'react';
import loginService from '../../services/login';
import LoginForm from '../../components/Login';
import SessionContext from './../../context/SessionContext';
import Home from './../Home';

import './Auth.css';

export default function Auth() {
    // manage register and login forms
    const {session, setSession} = useContext(SessionContext);

    return (
        <div className='authContainer'>
            {session
                ? <Home />
                : <LoginForm
                    doLogin={loginService.login}
                    handleUserSession={setSession}
                />
            }
        </div>
    )
}