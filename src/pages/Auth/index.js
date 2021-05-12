import React, {useContext} from 'react';
import {useLocation} from 'wouter';
import loginService from '../../services/login';
import LoginForm from '../../components/LoginForm';
import RegisterForm from '../../components/RegisterForm';
import SessionContext from './../../context/SessionContext';
import Home from './../Home';

import './Auth.css';

export default function Auth() {
    // manage register and login forms
    const {session, setSession} = useContext(SessionContext);
    const [location, setLocation] = useLocation();

    const renderForm = () => {
        return (
            <>
                {
                location === '/login'
                ?
                    <LoginForm
                        doLogin={loginService.login}
                        handleUserSession={setSession}/>
                :
                    location === '/register'
                    ?
                        <RegisterForm
                            doRegisterAndLogin={loginService.register}
                            handleUserSession={setSession}/>
                    :
                        setLocation('/')
                }
            </>
        );
    }

    return (
        <div className='authContainer'>
            {session
                ? <Home />
                : renderForm()
            }
        </div>
    )
}