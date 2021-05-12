import React, { useEffect, useContext } from 'react';
import {useLocation} from 'wouter';
import SessionContext from './../../context/SessionContext';
import './Home.css';

export default function Home() {
    const {session} = useContext(SessionContext);
    const setLocation = useLocation()[1];
    useEffect( () => {
        setLocation('/home');
    });
    return (
        <div className="homeContainer">
            <h2>Welcomo to your dashboard {session.name}</h2>
        </div>
    );
}