import React, {useContext} from 'react';
import SubPage from '../../components/SubPage';
import SessionContext from './../../context/SessionContext';

import TokenGithubStatus from './components/TokenGithubStatus';



export default function Projects() {    
    return (
        <div className="projectsContainer">
            <SubPage>
                <h2>My projects</h2>
                <TokenGithubStatus />
            </SubPage>
        </div>
    );
}