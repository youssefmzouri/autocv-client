import React from 'react';
import {Link} from 'wouter';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import FaceIcon from '@material-ui/icons/Face';
import DescriptionIcon from '@material-ui/icons/Description';
import FolderSpecialIcon from '@material-ui/icons/FolderSpecial';
import SchoolIcon from '@material-ui/icons/School';
import WorkIcon from '@material-ui/icons/Work';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';

const mainListItems = (
    <>
        <Link to="curriculums">
            <ListItem button>
                    <ListItemIcon>
                        <DescriptionIcon />
                    </ListItemIcon>
                    <ListItemText primary="Curriculums" />
            </ListItem>
        </Link>
        <Link to="projects">
            <ListItem button>
                <ListItemIcon>
                    <FolderSpecialIcon />
                </ListItemIcon>
                <ListItemText primary="Projects" />
            </ListItem>
        </Link>
        <Link to="laboralExperience">
            <ListItem button>
                <ListItemIcon>
                    <WorkIcon />
                </ListItemIcon>
                <ListItemText primary="Laboral experience" />
            </ListItem>
        </Link>
        <Link to="academicExperience">
            <ListItem button>
                <ListItemIcon>
                    <SchoolIcon />
                </ListItemIcon>
                <ListItemText primary="Academic experience" />
            </ListItem>
        </Link>
        <Link to="templates">
            <ListItem button>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Templates" />
            </ListItem>
        </Link>
        <Link to="personalInfo">
            <ListItem button>
                <ListItemIcon>
                    <ContactPhoneIcon />
                </ListItemIcon>
                <ListItemText primary="Personal info" />
            </ListItem>
        </Link>
        <Link to="profilePhotos">
            <ListItem button>
                <ListItemIcon>
                    <FaceIcon />
                </ListItemIcon>
                <ListItemText primary="Photos" />
            </ListItem>
        </Link>
    </>);

export {mainListItems};