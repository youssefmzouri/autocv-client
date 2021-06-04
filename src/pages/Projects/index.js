import React, {useState, useContext, useEffect} from 'react';
import SubPage from '../../components/SubPage';
import SessionContext from './../../context/SessionContext';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import GitHubIcon from '@material-ui/icons/GitHub';

import useGithubRepositories from '../../hooks/useGithubRepositories';

const urlGithub = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GITHUB_REDIRECT_URI}&scope=repo,user`;

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '0 8px 0 8px',
        width: '100%',
        '& > * + *': {
            margin: theme.spacing(1),
        },
    },
    alert: {
        alignItems: 'center',
    },
    anchor: {
        textDecoration: 'none'
    }
}));

export default function Projects() {
    const classes = useStyles();
    const {session, setSession} = useContext(SessionContext);
    const {repos} = useGithubRepositories({session, setSession});
    const tokenGithub = session.tokenGithub || '';
    
    return (
        <div className="projectsContainer">
            <SubPage>
                <h2>My projects</h2>
                <div className={classes.root}>
                    <Alert variant="outlined"
                        className={classes.alert}
                        icon={<GitHubIcon fontSize="large" />}
                        severity={tokenGithub ? 'success' : 'error'}
                        action={
                            <a  className={classes.anchor}
                                href={urlGithub}
                            >
                                <Button color="inherit" size="large">SYNC</Button>
                            </a>
                        }
                    >
                            {tokenGithub ? 'Synchronization with Githun performed successfully.' : 'Synchronization with Githun pending'}
                    </Alert>
                </div>
            </SubPage>
        </div>
    );
}