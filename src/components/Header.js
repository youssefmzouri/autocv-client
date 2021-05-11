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
    const [location, setLocation] = useLocation();

    const doLogout = () => {
        window.localStorage.removeItem('loggedAutoCvAppUser');
        setSession(null);
        if (location === '/home') setLocation('/');
    }

    return (
        <div className="headerContainer">
            <AppBar position="static">
                <Toolbar display="flex" p={1}>
                    <Box flexGrow={1} textAlign="left" p={1}>
                        <Link to="/">
                            <Typography variant="h4" >AutoCV</Typography>
                        </Link>
                    </Box>
                    {session === null
                        ?   <Box p={1}>
                                <Link to="/auth">
                                    <Button color="inherit">Login</Button>
                                </Link>
                                <Button color="inherit">Register</Button>
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