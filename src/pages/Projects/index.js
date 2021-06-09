import React, {useContext} from 'react';
import SubPage from '../../components/SubPage';
import SessionContext from './../../context/SessionContext';
import useProjects from './../../hooks/useProjects';

import TokenGithubStatus from './components/TokenGithubStatus';
import TableProjects from './components/TableProjects';
import RepositoriesFromGithub from './components/RepositoriesFromGithub';

export default function Projects() {
    const {session} = useContext(SessionContext);
    const {loading, projects} = useProjects({auth: session.Authorization});
    return (
        <div className="projectsContainer">
            <SubPage>
                <h2>My projects</h2>
                {loading
                    ? 'Cargando ...'
                    : <TableProjects
                        projects={projects}
                    />
                }
                <h2>Github repositories that I've built</h2>
                <TokenGithubStatus />
                {
                    session.tokenGithub ?
                        <RepositoriesFromGithub/>
                       : null
                }
            </SubPage>
        </div>
    );
}