import React, {useContext} from 'react';
import {useLocation, Redirect} from 'wouter';
import loginService from '../../services/login';
import LoginForm from '../../components/LoginForm';
import RegisterForm from '../../components/RegisterForm';
import SessionContext from './../../context/SessionContext';
import HeaderOutSession from '../../components/HeaderOutSession';

import './Auth.css';

export default function Auth() {
    const {session, setSession} = useContext(SessionContext);
    const [location] = useLocation();

    return (
        <div className='authContainer'>
            {!session ?
                <>
                    <HeaderOutSession />
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
            :
                <Redirect to="/home" />
            }
        </div>
    )
}