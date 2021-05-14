import React, { useContext } from 'react';
// import {useLocation} from 'wouter';
import SessionContext from './../../context/SessionContext';
import './Home.css';

export default function Home() {
    const {session} = useContext(SessionContext);
    
    return (
        <div className="homeContainer">
            <h2>Welcome to your dashboard {session.name}</h2>
        </div>
    );
}