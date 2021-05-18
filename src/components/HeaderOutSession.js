import React from 'react';
import {Link} from 'wouter';

// material-ui
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const HeaderOutSession = () => {
    return (
        <div className="headerOutSessionContainer">
            <AppBar position="static">
                <Toolbar display="flex" p={1}>
                    <Box flexGrow={1} textAlign="left" p={1}>
                        <Link to="/">
                            <Typography variant="h4" className="headerCompanyName">AutoCV</Typography>
                        </Link>
                    </Box>
                    <Box p={1}>
                        <Link to="/login">
                            <Button color="inherit">Login</Button>
                        </Link>
                        <Link to="/register">
                            <Button color="inherit">Register</Button>
                        </Link>
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default HeaderOutSession;