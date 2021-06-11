import React, {useContext} from 'react';
import SessionContext from './../../../context/SessionContext';
import useGithubRepositories from '../../../hooks/useGithubRepositories';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    repsitoriesFromGithubContainer: {
        display: 'grid',
        gap: '1rem',
        gridTemplateColumns: 'repeat(auto-fill, minmax(15rem, 1fr))',
        margin: '20px 0 0 0'
    },
    repoCard: {
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
        borderRadius: '5px',
        padding: '5px 8px',
        justifyContent: 'space-between'
    },
    cardHeader: {
        textAlign: 'left',
        '& > a': {
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '16px',
            marginLeft: '8px'
        }
    },
    cardDesc: {
        textAlign: 'left',
    },
    cardDetails: {
        display: 'flex',
        justifyContent: 'flex-start',
        gap: '10px'
    }
}));

const RepoComponent = ({key, repositoriy}) => {
    const classes = useStyles();
    return (
        <div className={classes.repoCard}>
            <div className={classes.cardHeader}>
                <a href={repositoriy.html_url}>{repositoriy.name}</a>
            </div>
            {
            repositoriy.description ?
                <div className={classes.cardDesc}>
                    {repositoriy.description}
                </div>
                : null
            }
            <div className={classes.cardDetails}>
                <span>Stars: {repositoriy.stargazers_count}</span>
                <span>Forks: {repositoriy.forks}</span>
            </div>
        </div>
    )
}

export default function RepositoriesFromGithub() {
    const classes = useStyles();
    const {session} = useContext(SessionContext);
    const {isLoading, githubRepos} = useGithubRepositories({session});
    console.log("Repos descargados: ", githubRepos);
    
    return (
        <div className={classes.repsitoriesFromGithubContainer}>
            {
                isLoading ? 
                    "Loading ... "
                    :
                    githubRepos.map(repo => {
                        return <RepoComponent key={repo.id} repositoriy={repo}/>
                    })
            }
        </div>
    );
}