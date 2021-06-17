import React, {useState, useContext} from 'react';
import SubPage from '../../../components/SubPage';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';

import {Link, useRoute } from 'wouter';
import projectsService from '../../../services/projects';
import Notification from '../../../components/Notification';
import SessionContext from '../../../context/SessionContext';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useEffect } from 'react';


const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1)
        },
    },
    button: {
        margin: theme.spacing(1),
        marginRight: 0,
    },
    actionButtonsTable:{
        display: 'flex',
        justifyContent: 'flex-end'
    },
    headerPage: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        "& > svg": {
            cursor: "pointer",
            margin: "0 10px 0 10px"
        }
    }
}));


export default function FormProject() {
    const classes = useStyles();
    const [match, params] = useRoute('/projects/edit/:id');
    const {session} = useContext(SessionContext);
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [isFromGithub, setIsFromGithub] = useState(false);
    const [githubUri, setGithubUri] = useState('');
    const [notificationMessage, setNotificationMessage] = useState({message: null, severity: null});
    const [isEditPage, setIsEditPage] = useState(false);
    
    useEffect( () => {
        if (match) {
            setIsEditPage(true);
            projectsService.getUserProject({Authorization: session.Authorization}, params.id)
            .then(project => {
                console.log('This is the edit project page: ', project);
                setProjectName(project.name);
                setProjectDescription(project.description);
                setIsFromGithub(project.isFromGithub);
                setGithubUri(project.githubUri);
            }).catch(error => {
                console.log('Error getting projects by id', error)
            });
        }
    }, [setIsEditPage, match]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const data  = {
                name: projectName,
                description: projectDescription,
                isFromGithub,
                githubUri: isFromGithub ? githubUri : ''
            };
            let project; 
            
            if (isEditPage) {
                project = await projectsService.updateUserProject({"Authorization": session.Authorization}, {id: params.id, ...data});
                setProjectName(project.name);
                setProjectDescription(project.description);
                setIsFromGithub(project.isFromGithub);
                setGithubUri(project.githubUri);
                setNotificationMessage({
                    message: `The project was updated succesfully with date: ${project.updatedAt}`,
                    severity: 'success'
                });
            } else {
                project = await projectsService.postUserProjects({"Authorization": session.Authorization}, data);
                setProjectName('');
                setProjectDescription('');
                setIsFromGithub(false);
                setGithubUri('');
                setNotificationMessage({
                    message: `The project was created succesfully with date: ${project.updatedAt}`,
                    severity: 'success'
                });
            }
        } catch (e) {
            console.log('Invalid data');
            setNotificationMessage({message:'Invalid data', severity: 'error'});
            setTimeout(() => {
                setNotificationMessage({message:null});
            }, 5000);
        }
    };
    
    return (
        <div className="projectsCreateContainer">
            <SubPage>
                <div className={classes.headerPage}>
                    <Link to="/projects">
                        <ArrowBackIcon color="primary" />
                    </Link>
                    <h2>Describe one of the projects you've been working</h2>
                </div>
                <form className={classes.root} onSubmit={handleSubmit} noValidate autoComplete="off">
                    <Grid container>
                        <Grid item xs={12}>
                            <Notification message={notificationMessage.message} severity={notificationMessage.severity}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="name"
                                value={projectName}
                                onChange={({target}) => {
                                    setProjectName(target.value)}
                                }
                                id="nameProject"
                                label="Project name"
                                variant="outlined"
                                required
                                fullWidth
                                autoComplete="nameProject"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="description"
                                value={projectDescription}
                                onChange={({target}) => setProjectDescription(target.value)}
                                id="descriptionProject"
                                label="Project description"
                                variant="outlined"
                                multiline
                                rows={4}
                                required
                                fullWidth
                                autoComplete="descriptionProject"
                            />
                        </Grid>
                        <Grid container justify="flex-start" alignItems="center">
                            <Grid item xs={12} sm={3}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={isFromGithub}
                                            onChange={() => {
                                                setIsFromGithub(!isFromGithub);
                                            }}
                                            name="isFromGithub"
                                            color="primary"
                                        />
                                    }
                                    label="Have a repository on Github?"
                                />
                            </Grid>
                            {isFromGithub ? 
                                <Grid item xs={12} sm={9}>
                                    <TextField
                                        name="githubUri"
                                        value={githubUri}
                                        onChange={({target}) => {
                                            setGithubUri(target.value)}
                                        }
                                        id="githubUriProject"
                                        label="Github repository URL"
                                        variant="outlined"
                                        fullWidth
                                        autoComplete="githubUri"
                                    />
                                </Grid>
                                :
                                null
                            }
                        </Grid>
                    </Grid>
                </form>
                <div className={classes.actionButtonsTable}>
                    <Link to="/projects">
                        <Button variant="contained"
                            color="secondary"
                            className={classes.button}
                            startIcon={<CloseIcon />}>
                            Cancel
                        </Button>
                    </Link>
                    
                    <Button variant="contained"
                        onClick={handleSubmit}
                        color="primary"
                        className={classes.button}
                        startIcon={<SaveIcon />}>
                        {isEditPage? 'Update Project':'Save Project'}
                    </Button>
                </div>
            </SubPage>
        </div>
    );
}