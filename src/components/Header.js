import React, {useContext} from 'react';
import {Link, useLocation} from 'wouter';
import SessionContext from './../context/SessionContext';

// material-ui
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const Header = () => {
    const {session, setSession} = useContext(SessionContext);
    const setLocation = useLocation()[1];
    const linkToHome = session === null ? '/' : '/home';

    const doLogout = () => {
        window.localStorage.removeItem('loggedAutoCvAppUser');
        setSession(null);
        setLocation('/');
    }

    return (
        <div className="headerContainer">
            <AppBar position="static">
                <Toolbar display="flex" p={1}>
                    <Box flexGrow={1} textAlign="left" p={1}>
                        <Link to={linkToHome}>
                            <Typography variant="h4" className="headerCompanyName" >AutoCV</Typography>
                        </Link>
                    </Box>
                    {session === null
                        ?   <Box p={1}>
                                <Link to="/login">
                                    <Button color="inherit">Login</Button>
                                </Link>
                                <Link to="/register">
                                    <Button color="inherit">Register</Button>
                                </Link>
                            </Box>
                        :   <Box p={1}>
                                <Button onClick={doLogout} color="inherit">Logout</Button>
                            </Box>
                    }
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header;