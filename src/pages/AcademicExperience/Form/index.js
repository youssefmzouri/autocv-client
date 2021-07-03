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
import academicExpService from '../../../services/academicExperience';
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


export default function FormAcademicExperience() {
    const classes = useStyles();
    const [match, params] = useRoute('/academicexperiences/edit/:id');
    const {session} = useContext(SessionContext);
    
    const [schoolName, setSchoolName] = useState('');
    const [degree, setDegree] = useState('');
    const [endYear, setEndYear] = useState(new Date);
    const [stillActive, setStillActive] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState({message: null, severity: null});
    const [isEditPage, setIsEditPage] = useState(false);
    
    useEffect( () => {
        if (match) {
            setIsEditPage(true);
            academicExpService.getOneUserAcademicExp({Authorization: session.Authorization}, params.id)
            .then(acaExp => {
                console.log('This is the edit academic experience page: ', acaExp);
                setSchoolName(acaExp.school);
                setDegree(acaExp.degree);
                setStillActive(acaExp.stillActive);
                setEndYear(acaExp.endYear);
            }).catch(error => {
                console.log('Error getting projects by id', error)
            });
        }
    }, [setIsEditPage, match]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const data  = {
                school: schoolName,
                degree,
                stillActive,
                endYear : stillActive ? '' : endYear
            };
            let acaExp; 
            
            if (isEditPage) {
                acaExp = await academicExpService.updateUserAcademicExp({"Authorization": session.Authorization}, params.id, data);
                setSchoolName(acaExp.school);
                setDegree(acaExp.degree);
                setStillActive(acaExp.stillActive);
                setEndYear(acaExp.endYear);
                setNotificationMessage({
                    message: `The academic experience was updated succesfully with date: ${acaExp.updatedAt}`,
                    severity: 'success'
                });
            } else {
                console.log('Sending data to create academic experience', data);
                acaExp = await academicExpService.postUserAcademicExp({"Authorization": session.Authorization}, data);
                setSchoolName('');
                setDegree('');
                setStillActive(false);
                setEndYear(new Date());                
                setNotificationMessage({
                    message: `The academic experience was created succesfully with date: ${acaExp.updatedAt}`,
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
        <div className="academicExperienceCreateContainer">
            <SubPage>
                <div className={classes.headerPage}>
                    <Link to="/academicexperiences">
                        <ArrowBackIcon color="primary" />
                    </Link>
                    <h2>Academic experience form page</h2>
                </div>
                <form className={classes.root} onSubmit={handleSubmit} noValidate autoComplete="off">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Notification message={notificationMessage.message} severity={notificationMessage.severity}/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="schoolName"
                                value={schoolName}
                                onChange={({target}) => {
                                    setSchoolName(target.value)}
                                }
                                id="schoolName"
                                label="School name"
                                variant="outlined"
                                required
                                fullWidth
                                autoComplete="schoolName"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="degree"
                                value={degree}
                                onChange={({target}) => {
                                    setDegree(target.value)}
                                }
                                id="degree"
                                label="Degree name"
                                variant="outlined"
                                required
                                fullWidth
                                autoComplete="degree"
                            />
                        </Grid>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid item xs={12} sm={6}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    openTo="year"
                                    views={["year"]}
                                    variant="inline"
                                    format="yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="End year"
                                    disabled={stillActive}
                                    required
                                    value={endYear}
                                    onChange={(date) => {
                                        setEndYear(date);
                                    }}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>
                        </MuiPickersUtilsProvider>
                        <Grid item xs={12} sm={6}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={stillActive}
                                        onChange={() => {
                                            setStillActive(!stillActive);
                                        }}
                                        name="stillActive"
                                        color="primary"
                                    />
                                }
                                label="Not finished yet"
                            />
                        </Grid>
                    </Grid>
                </form>
                <div className={classes.actionButtonsTable}>
                    <Link to="/academicexperiences">
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