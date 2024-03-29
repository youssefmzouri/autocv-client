import React, {useState, useContext} from 'react';
import {useLocation, Link} from 'wouter';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import {mainListItems} from './ListItemsMenu';
import SessionContext from '../context/SessionContext';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  }
}));


const HeaderInSession = ({children}) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [userMenu, setUserMenu] = useState(null);
    const openUserMenu = Boolean(userMenu);
    const {setSession} = useContext(SessionContext);
    const [,setLocation] = useLocation();

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const handleClickUserMenu = (event) => {
        setUserMenu(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setUserMenu(null);
    };
    const handleGoToProfile = () => {
      setUserMenu(null);
      setLocation('/profile');
    }
    const handleLogOut = () => {
      setUserMenu(null);
      window.localStorage.removeItem('loggedAutoCvAppUser');
      setSession(null);
      setLocation('/');
    }
    
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Link to="/home">
                      <Typography component="h1" variant="h4" color="inherit" noWrap className={classes.title}>
                          AutoCV
                      </Typography>
                    </Link>
                    <IconButton 
                        color="inherit"
                        aria-controls="fade-menu"
                        aria-haspopup="true"
                        onClick={handleClickUserMenu}>
                        <AccountCircleIcon />
                    </IconButton>
                    <Menu
                        id="fade-menu"
                        anchorEl={userMenu}
                        keepMounted
                        open={openUserMenu}
                        onClose={handleCloseUserMenu}
                        TransitionComponent={Fade}
                    >
                        <MenuItem onClick={handleGoToProfile}>My profile</MenuItem>
                        <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                <IconButton onClick={handleDrawerClose}>
                    <ChevronLeftIcon />
                </IconButton>
                </div>
                <Divider />
                <List>{mainListItems}</List>
            </Drawer>
            {children}
        </div>
    );
}

export default HeaderInSession;