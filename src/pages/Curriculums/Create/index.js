import React, {useState, useContext} from 'react';
import SubPage from '../../../components/SubPage';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import {Link} from 'wouter';
import cvService from '../../../services/curriculums';
import Notification from '../../../components/Notification';
import SessionContext from '../../../context/SessionContext';


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


export default function CreateCurriculum() {
    const classes = useStyles();

    const {session} = useContext(SessionContext);
    const [cvName, setCvName] = useState('');
    const [cvDescription, setCvDescription] = useState('');
    const [notificationMessage, setNotificationMessage] = useState({message: null, severity: null});

    const handleCreation = async (event) => {
        event.preventDefault();
        try {
            const cv = await cvService.postUserCurriculums({"Authorization": session.Authorization}, {
                name: cvName,
                description: cvDescription
            });
            
            setCvName('');
            setCvDescription('');
            setNotificationMessage({
                message: `El curriculum se ha creado correctamente con el siguiente id: ${cv.id}`,
                severity: 'success'
            });
        } catch (e) {
            console.log('Invalid data');
            setNotificationMessage({message:'Invalid data', severity: 'error'});
            setTimeout(() => {
                setNotificationMessage({message:null});
            }, 5000);
        }
    };
    
    return (
        <div className="curriculumsCreateContainer">
            <SubPage>
                <div className={classes.headerPage}>
                    <Link to="/curriculums">
                        <ArrowBackIcon color="primary" />
                    </Link>
                    <h2>Start creating your curriculum</h2>
                </div>
                <form className={classes.root} onSubmit={handleCreation} noValidate autoComplete="off">
                    <Grid container>
                        <Grid item xs={12}>
                            <Notification message={notificationMessage.message} severity={notificationMessage.severity}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="name"
                                value={cvName}
                                onChange={({target}) => {
                                    console.log('cambiando el name: ', target.value);
                                    setCvName(target.value)}
                                }
                                id="namecv"
                                label="Curriculum name"
                                variant="outlined"
                                required
                                fullWidth
                                autoComplete="namecv"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="description"
                                value={cvDescription}
                                onChange={({target}) => setCvDescription(target.value)}
                                id="descriptioncv"
                                label="Curriculum description"
                                variant="outlined"
                                multiline
                                rows={4}
                                required
                                fullWidth
                                autoComplete="descriptioncv"
                            />
                        </Grid>
                    </Grid>
                </form>
                <div className={classes.actionButtonsTable}>
                    <Link to="/curriculums">
                        <Button variant="contained"
                            color="secondary"
                            className={classes.button}
                            startIcon={<CloseIcon />}>
                            Cancel
                        </Button>
                    </Link>
                    
                    <Button variant="contained"
                        onClick={handleCreation}
                        color="primary"
                        className={classes.button}
                        startIcon={<SaveIcon />}>
                        Save CV
                    </Button>
                </div>
            </SubPage>
        </div>
    );
}