import React, {useContext} from 'react';
import {useLocation} from 'wouter';
import loginService from '../../services/login';
import LoginForm from '../../components/LoginForm';
import RegisterForm from '../../components/RegisterForm';
import SessionContext from './../../context/SessionContext';

import './Auth.css';

export default function Auth() {
    const {session, setSession} = useContext(SessionContext);
    const [location, setLocation] = useLocation();

    // const goHome = () => {
    //     setLocation('/home');
    // }

    return (
        <div className='authContainer'>
            <>
                {
                    location === '/register'
                ?
                    <RegisterForm
                        doRegisterAndLogin={loginService.register}
                        handleUserSession={setSession}/>
                :
                    <LoginForm
                        doLogin={loginService.login}
                        handleUserSession={setSession}/>
                }
            </>
        </div>
    )
}