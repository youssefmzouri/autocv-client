import React, { useEffect } from 'react';
import {useLocation} from 'wouter';
import './Home.css';

export default function Home() {
    const [location, setLocation] = useLocation();
    useEffect( () => {
        setLocation('/home');
    });
    return (
        <div className="homeContainer">
            <h1>Home ...</h1>        
        </div>
    )
}