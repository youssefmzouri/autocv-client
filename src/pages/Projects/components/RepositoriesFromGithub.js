import React, {useContext} from 'react';
import SessionContext from './../../../context/SessionContext';
import useGithubRepositories from '../../../hooks/useGithubRepositories';
import { makeStyles } from '@material-ui/core/styles';
import CodeIcon from '@material-ui/icons/Code';
import StarIcon from '@material-ui/icons/Star';
import ShareIcon from '@material-ui/icons/Share';
import LockIcon from '@material-ui/icons/Lock';
import VisibilityIcon from '@material-ui/icons/Visibility';


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
        display: 'flex',
        alignContent: 'center',
        '& > a': {
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '16px',
            marginLeft: '8px'
        }
    },
    cardDesc: {
        textAlign: 'left',
        display: '-webkit-box',
        '-webkit-line-clamp': '2',
        '-webkit-box-orient': 'vertical',
        overflow: 'hidden'
    },
    cardDetails: {
        display: 'flex',
        justifyContent: 'flex-start',
        gap: '18px',
        '& > span': {
            display: 'flex',
            alignContent: 'center',
            alignItems: 'center',
            gap: '5px',
            fontSize: '14px',
            '& > svg': {
                fontSize: '14px',
            }
        }
    }
}));

const RepoComponent = ({repositoriy}) => {
    const classes = useStyles();
    return (
        <div className={classes.repoCard}>
            <div className={classes.cardHeader}>
                <CodeIcon aria-label="repository" fontSize="small"/>
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
                <span>
                    <StarIcon aria-label="Stars" fontSize="small"/>
                    {repositoriy.stargazers_count}
                </span>
                <span>
                    <ShareIcon aria-label="Forks" fontSize="small"/>
                    {repositoriy.forks}
                </span>
                <span>
                    <VisibilityIcon aria-label="Watchers" fontSize="small"/>
                    {repositoriy.watchers}
                </span>
                <span>
                    {repositoriy.private ?
                        <LockIcon aria-label="Private" fontSize="small"/>
                        : null
                    }
                </span>
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