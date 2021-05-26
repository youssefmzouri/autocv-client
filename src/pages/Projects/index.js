import React, {useState, useContext} from 'react';
import SubPage from '../../components/SubPage';
import SessionContext from './../../context/SessionContext';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import GitHubIcon from '@material-ui/icons/GitHub';
import {Link, Redirect} from 'wouter';


const client_id = '...';
const urlGithub = `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=repo,user`;

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
    }
}));

export default function Projects() {
    const classes = useStyles();
    const {session} = useContext(SessionContext);
    const {tokenGithub, setTokenGithub} = useState('');
    const [data, setData] = useState({ errorMessage: "", isLoading: false });
    
    return (
        <div className="projectsContainer">
            <SubPage>
                <h2>My projects</h2>
                <div className={classes.root}>
                    <Alert variant="outlined"
                        className={classes.alert}
                        icon={<GitHubIcon fontSize="large" />}
                        severity={tokenGithub ? 'success' : 'error'}
                        action={<Link to={urlGithub}><Button color="inherit" size="large">SYNC</Button></Link>}
                    >
                            {tokenGithub ? 'Synchronization with Githun performed successfully.' : 'Synchronization with Githun pending'}
                    </Alert>
                </div>
            </SubPage>
        </div>
    );
}