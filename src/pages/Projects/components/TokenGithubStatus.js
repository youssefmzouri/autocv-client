import React from 'react';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import GitHubIcon from '@material-ui/icons/GitHub';
import { makeStyles } from '@material-ui/core/styles';

const urlGithub = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GITHUB_REDIRECT_URI}&scope=repo,user`;

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '0',
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

export default function TokenGithubStatus({isLoading, tokenGithub}) {
    const classes = useStyles();
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