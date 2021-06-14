import React, {useContext} from 'react';
import SubPage from '../../components/SubPage';
import SessionContext from './../../context/SessionContext';
import useProjects from './../../hooks/useProjects';
import useGithubAccessToken from './../../hooks/useGithubAccessToken';

import TokenGithubStatus from './components/TokenGithubStatus';
import TableProjects from './components/TableProjects';
import RepositoriesFromGithub from './components/RepositoriesFromGithub';

export default function Projects() {
    const {session, setSession} = useContext(SessionContext);
    const {loadingProjects, projects} = useProjects({auth: session.Authorization});
    const {isLoadingToken, tokenGithub} =  useGithubAccessToken({session, setSession});

    return (
        <div className="projectsContainer">
            <SubPage>
                <h2>My projects</h2>
                {loadingProjects
                    ? 'Loading ...'
                    : <TableProjects
                        projects={projects}
                    />
                }
                <h2>Github repositories that I've built</h2>
                <TokenGithubStatus isLoading={isLoadingToken} tokenGithub={tokenGithub}/>
                {
                    tokenGithub && !isLoadingToken ?
                        <RepositoriesFromGithub />
                       : null
                }
            </SubPage>
        </div>
    );
}