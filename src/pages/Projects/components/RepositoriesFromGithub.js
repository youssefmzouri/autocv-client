import React, {useContext} from 'react';
import SessionContext from './../../../context/SessionContext';
import useGithubRepositories from '../../../hooks/useGithubRepositories';


const RepoComponent = ({repositoriy}) => {
    return (
        <div className="repoContainer">
            <h2>{repositoriy.name}</h2>
            <p>{repositoriy.description}</p>
        </div>
    )
}

export default function RepositoriesFromGithub() {
    const {session} = useContext(SessionContext);
    const {isLoading, githubRepos} = useGithubRepositories({session});
    console.log("Repos descargados: ", githubRepos);
    
    return (
        <div className="repsitoriesFromGithubContainer">
            {
                isLoading ? 
                    "Cargando ... "
                    :
                    githubRepos.map(repo => {
                        return <RepoComponent key={repo.id} repositoriy={repo}/>
                    })
            }
        </div>
    );
}