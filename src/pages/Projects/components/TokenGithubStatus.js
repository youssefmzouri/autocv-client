import React, {useContext} from 'react';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import SessionContext from './../../../context/SessionContext';
import GitHubIcon from '@material-ui/icons/GitHub';
import useGithubAccessToken from '../../../hooks/useGithubAccessToken';
import { makeStyles } from '@material-ui/core/styles';

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

export default function TokenGithubStatus() {
    const classes = useStyles();
    const {session, setSession} = useContext(SessionContext);
    const {isLoading, tokenGithub} =  useGithubAccessToken({session, setSession});
    return (
        <div className={classes.root}>
            {
                isLoading ?
                    <Alert variant="outlined"
                        className={classes.alert}
                        icon={<GitHubIcon fontSize="large" />}
                        severity="warning"
                    >
                        {'Validating the Github token saved loacally....'}
                    </Alert>
                :
                    <Alert variant="outlined"
                        className={classes.alert}
                        icon={<GitHubIcon fontSize="large" />}
                        severity={tokenGithub ? 'success' : 'error'}
                        action={
                            tokenGithub ?
                                null
                            :
                                <a  className={classes.anchor} href={urlGithub}>
                                    <Button color="inherit" size="large">SYNC</Button>
                                </a>
                        }
                    >
                            {tokenGithub ? 'Synchronization with Github performed successfully.' : 'Synchronization with Github pending'}
                    </Alert>
            }
        </div>
    );
}