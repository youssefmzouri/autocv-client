import React, { useContext } from 'react';
import SessionContext from './../../context/SessionContext';
import SubPage from '../../components/SubPage';

import './Home.css';

export default function Home() {
    const {session} = useContext(SessionContext);
    return (
        <div className="homeContainer">
          <SubPage>
            <h2>Welcome to your dashboard {session.name}</h2>
          </SubPage>
        </div>
    );
}