import React, {useState} from 'react';
import Notification from './Notification';

// material-ui

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '} AutoVC{' '} {new Date().getFullYear()}
      </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

const RegisterForm = ({doRegisterAndLogin, handleUserSession}) => {
    const classes = useStyles();
    const [userName, setUserName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    
    const [notificationMessage, setNotificationMessage] = useState({
        message: null,
        severity: null
    });

    const handleRegister = async (event) => {
        event.preventDefault();

        try {
            const user = await doRegisterAndLogin({
                name: userName,
                lastName: userLastName,
                email: userEmail,
                password: userPassword
            });

            window.localStorage.setItem (
                'loggedAutoCvAppUser',
                JSON.stringify(user)
            );
            
            handleUserSession(user);
            setUserName('');
            setUserLastName('');
            setUserEmail('');
            setUserPassword('');
        } catch (e) {
            console.log('Invalid data');
            setNotificationMessage({message:'Invalid data', severity: 'error'});
            setTimeout(() => {
                setNotificationMessage({message:null});
            }, 5000);
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <Notification message={notificationMessage.message} severity={notificationMessage.severity}/>
                <form className={classes.form} onSubmit={handleRegister} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="name"
                                value={userName}
                                onChange={({target}) => setUserName(target.value)}
                                id="name"
                                autoComplete="name"
                                variant="outlined"
                                required
                                fullWidth
                                label="Name"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="lastName"
                                value={userLastName}
                                onChange={({target}) => setUserLastName(target.value)}
                                id="lastName"
                                variant="outlined"
                                required
                                fullWidth
                                label="Last Name"
                                autoComplete="lname"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="email"
                                value={userEmail}
                                onChange={({target}) => setUserEmail(target.value)}
                                id="email"
                                label="User email"
                                variant="outlined"
                                required
                                fullWidth
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="password"
                                type="password"
                                value={userPassword}
                                onChange={({target}) => setUserPassword(target.value)}
                                id="password"
                                variant="outlined"
                                required
                                fullWidth
                                label="Password"
                                autoComplete="current-password"
                                placeholder="User password"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Register
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item >
                            <Link href="/login" variant="body2">
                                Already have an account? Log in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    )
};

export default RegisterForm;