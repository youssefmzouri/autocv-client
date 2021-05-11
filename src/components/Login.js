import React, {useState} from 'react';
import Notification from '../components/Notification';

// material-ui

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
}));

const Login = ({doLogin, handleUserSession}) => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [notificationMessage, setNotificationMessage] = useState({
        message: null,
        severity: null
    });
    const classes = useStyles();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const user = await doLogin({
                email: userEmail,
                password: userPassword
            });

            window.localStorage.setItem (
                'loggedAutoCvAppUser',
                JSON.stringify(user)
            );
            
            handleUserSession(user);
            setUserEmail('');
            setUserPassword('');
        } catch (e) {
            console.log('Wrong credentials');
            setNotificationMessage({message:'Wrong credentials', severity: 'error'});
            setTimeout(() => {
                setNotificationMessage({message:null});
            }, 5000);
        }
    }

    return(
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Log in
                </Typography>
                <Notification message={notificationMessage.message} severity={notificationMessage.severity}/>
                <form className={classes.form} onSubmit={handleLogin} noValidate>
                    <TextField
                        name="email"
                        value={userEmail}
                        onChange={({target}) => setUserEmail(target.value)}
                        id="email"
                        label="User email"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        autoComplete="email"
                    />
                    <TextField
                        name="password"
                        type="password"
                        value={userPassword}
                        onChange={({target}) => setUserPassword(target.value)}
                        id="password"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        autoComplete="current-password"
                        placeholder="User password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Log in
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Create an account"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}

export default Login;