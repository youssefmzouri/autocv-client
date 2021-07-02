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
import laboralExpService from '../../../services/laboralExperience';
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


export default function FormLaboralExperience() {
    const classes = useStyles();
    const [match, params] = useRoute('/projects/edit/:id');
    const {session} = useContext(SessionContext);
    
    const [companyName, setCompanyName] = useState('');
    const [position, setPosition] = useState('');
    const [location, setLocation] = useState('');
    const [companyWebPage, setCompanyWebPage] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date);
    const [laboralExperienceDescription, setLaboralExperienceDescription] = useState('');
    const [stillWorkingHere, setStillWorkingHere] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState({message: null, severity: null});
    const [isEditPage, setIsEditPage] = useState(false);
    
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
        event.preventDefault();
        try {
            const data  = {
                companyName,
                position,
                description: laboralExperienceDescription,
                stillActive: stillWorkingHere,
                startDate,
                endDate : stillWorkingHere ? '' : endDate,
                location,
                companyWebPage
            };
            let lexp; 
            
            if (isEditPage) {
                // lexp = await laboralExpService.updateUserProject({"Authorization": session.Authorization}, {id: params.id, ...data});
                // setProjectName(lexp.name);
                // setProjectDescription(lexp.description);
                // setIsFromGithub(lexp.isFromGithub);
                // setGithubUri(lexp.githubUri);
                // setNotificationMessage({
                //     message: `The laboral experience was updated succesfully with date: ${lexp.updatedAt}`,
                //     severity: 'success'
                // });
            } else {
                console.log('Sending data to backend', data);
                // lexp = await laboralExpService.postUserLaboralExp({"Authorization": session.Authorization}, data);
                // setLocation('');
                // setPosition('');
                // setStartDate(new Date());
                // setEndDate(new Date());
                // setCompanyName('');
                // setCompanyWebPage('');
                // setLaboralExperienceDescription('');
                // setStillWorkingHere(false);
                
                // setNotificationMessage({
                //     message: `The laboral experience was created succesfully with date: ${lexp.updatedAt}`,
                //     severity: 'success'
                // });
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
        <div className="laboralExperienceCreateContainer">
            <SubPage>
                <div className={classes.headerPage}>
                    <Link to="/laboralexperiences">
                        <ArrowBackIcon color="primary" />
                    </Link>
                    <h2>Laboral experience form page</h2>
                </div>
                <form className={classes.root} onSubmit={handleSubmit} noValidate autoComplete="off">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Notification message={notificationMessage.message} severity={notificationMessage.severity}/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="companyName"
                                value={companyName}
                                onChange={({target}) => {
                                    setCompanyName(target.value)}
                                }
                                id="companyName"
                                label="Company name"
                                variant="outlined"
                                required
                                fullWidth
                                autoComplete="companyName"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="position"
                                value={position}
                                onChange={({target}) => {
                                    setPosition(target.value)}
                                }
                                id="position"
                                label="Company position"
                                variant="outlined"
                                required
                                fullWidth
                                autoComplete="position"
                            />
                        </Grid>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid item xs={12} sm={6}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="Start date"
                                    required
                                    value={startDate}
                                    onChange={(date) => {
                                        setStartDate(date);
                                    }}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="End date"
                                    disabled={stillWorkingHere}
                                    value={endDate}
                                    onChange={(date) => {
                                        setEndDate(date);
                                    }}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>
                        </MuiPickersUtilsProvider>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={stillWorkingHere}
                                        onChange={() => {
                                            setStillWorkingHere(!stillWorkingHere);
                                        }}
                                        name="stillActive"
                                        color="primary"
                                    />
                                }
                                label="Still working here?"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="description"
                                value={laboralExperienceDescription}
                                onChange={({target}) => setLaboralExperienceDescription(target.value)}
                                id="laboralExperienceDescription"
                                label="Laboral experience description"
                                variant="outlined"
                                multiline
                                rows={4}
                                required
                                fullWidth
                                autoComplete="laboralExperienceDescription"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="companyWebPage"
                                value={companyWebPage}
                                onChange={({target}) => {
                                    setCompanyWebPage(target.value)}
                                }
                                id="companyWebPage"
                                label="Company web page (URL)"
                                variant="outlined"
                                fullWidth
                                autoComplete="companyWebPage"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="location"
                                value={location}
                                onChange={({target}) => {
                                    setLocation(target.value)}
                                }
                                id="location"
                                label="Work location"
                                variant="outlined"
                                fullWidth
                                autoComplete="location"
                            />
                        </Grid>
                    </Grid>
                </form>
                <div className={classes.actionButtonsTable}>
                    <Link to="/laboralexperiences">
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
                        {isEditPage? 'Update Experience':'Save Experience'}
                    </Button>
                </div>
            </SubPage>
        </div>
    );
}