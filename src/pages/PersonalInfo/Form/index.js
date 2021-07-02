import React, {useState, useContext} from 'react';
import SubPage from '../../../components/SubPage';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
  

import {Link, useRoute } from 'wouter';
// import laboralExpService from '../../../services/laboralExperience';
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


export default function FormPersonalInfo() {
    const classes = useStyles();
    // const [match, params] = useRoute('/projects/edit/:id');
    const match = false;
    const {session} = useContext(SessionContext);
    
    const [emailContact, setEmailContact] = useState('');
    const [phoneContact, setPhoneContact] = useState('');
    const [githubUser, setGithubUser] = useState('');
    const [linkedinUser, setLinkedinUser] = useState('');
    const [web, setWeb] = useState('');
    const [city, setCity] = useState('');
    
    
    const [notificationMessage, setNotificationMessage] = useState({message: null, severity: null});
    const [isEditPage, setIsEditPage] = useState(false);

    // to delete    
    useEffect( () => {
        if (match) {
            // setIsEditPage(true);
            // laboralExpService.getUserProject({Authorization: session.Authorization}, params.id)
            // .then(lexp => {
            //     console.log('This is the edit project page: ', lexp);
            //     setCompanyName(lexp.name);
            //     setLaboralExperienceDescription(lexp.description);
            //     setStillWorkingHere(lexp.isFromGithub);
            // }).catch(error => {
            //     console.log('Error getting projects by id', error)
            // });
        }
    }, [setIsEditPage, match]);

    const handleSubmit = async (event) => {
        // event.preventDefault();
        // try {
        //     const data  = {
        //         companyName,
        //         position,
        //         description: laboralExperienceDescription,
        //         stillActive: stillWorkingHere,
        //         startDate,
        //         endDate : stillWorkingHere ? '' : endDate,
        //         location,
        //         companyWebPage
        //     };
        //     let lexp; 
            
        //     if (isEditPage) {
        //         // lexp = await laboralExpService.updateUserProject({"Authorization": session.Authorization}, {id: params.id, ...data});
        //         // setProjectName(lexp.name);
        //         // setProjectDescription(lexp.description);
        //         // setIsFromGithub(lexp.isFromGithub);
        //         // setGithubUri(lexp.githubUri);
        //         // setNotificationMessage({
        //         //     message: `The laboral experience was updated succesfully with date: ${lexp.updatedAt}`,
        //         //     severity: 'success'
        //         // });
        //     } else {
        //         console.log('Sending data to backend', data);
        //         // lexp = await laboralExpService.postUserLaboralExp({"Authorization": session.Authorization}, data);
        //         // setLocation('');
        //         // setPosition('');
        //         // setStartDate(new Date());
        //         // setEndDate(new Date());
        //         // setCompanyName('');
        //         // setCompanyWebPage('');
        //         // setLaboralExperienceDescription('');
        //         // setStillWorkingHere(false);
                
        //         // setNotificationMessage({
        //         //     message: `The laboral experience was created succesfully with date: ${lexp.updatedAt}`,
        //         //     severity: 'success'
        //         // });
        //     }
        // } catch (e) {
        //     console.log('Invalid data');
        //     setNotificationMessage({message:'Invalid data', severity: 'error'});
        //     setTimeout(() => {
        //         setNotificationMessage({message:null});
        //     }, 5000);
        // }
    };
    
    return (
        <div className="projectsCreateContainer">
            <SubPage>
                <div className={classes.headerPage}>
                    <Link to="/personalInfo">
                        <ArrowBackIcon color="primary" />
                    </Link>
                    <h2>Personal information form page</h2>
                </div>
                <form className={classes.root} onSubmit={handleSubmit} noValidate autoComplete="off">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Notification message={notificationMessage.message} severity={notificationMessage.severity}/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="emailContact"
                                value={emailContact}
                                onChange={({target}) => {
                                    setEmailContact(target.value)}
                                }
                                id="emailContact"
                                label="Email Contact"
                                variant="outlined"
                                required
                                fullWidth
                                autoComplete="emailContact"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="phoneContact"
                                value={phoneContact}
                                onChange={({target}) => {
                                    setPhoneContact(target.value)}
                                }
                                id="phoneContact"
                                label="Phone Contact"
                                variant="outlined"
                                required
                                fullWidth
                                autoComplete="phoneContact"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="githubUser"
                                value={githubUser}
                                onChange={({target}) => {
                                    setGithubUser(target.value)}
                                }
                                id="githubUser"
                                label="Github user"
                                variant="outlined"
                                fullWidth
                                autoComplete="githubUser"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="linkedinUser"
                                value={linkedinUser}
                                onChange={({target}) => {
                                    setLinkedinUser(target.value)}
                                }
                                id="linkedinUser"
                                label="Linkedin user"
                                variant="outlined"
                                fullWidth
                                autoComplete="linkedinUser"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="web"
                                value={web}
                                onChange={({target}) => {
                                    setWeb(target.value)}
                                }
                                id="web"
                                label="Web page"
                                variant="outlined"
                                fullWidth
                                autoComplete="web"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="city"
                                value={city}
                                onChange={({target}) => {
                                    setCity(target.value)}
                                }
                                id="city"
                                label="City"
                                variant="outlined"
                                fullWidth
                                autoComplete="city"
                            />
                        </Grid>
                    </Grid>
                </form>
                <div className={classes.actionButtonsTable}>
                    <Link to="/personalInfo">
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
                        {isEditPage? 'Update Personal Info':'Save Personal Info'}
                    </Button>
                </div>
            </SubPage>
        </div>
    );
}