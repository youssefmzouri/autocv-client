import React, {useState, useContext, useEffect} from 'react';
import SubPage from '../../../components/SubPage';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import Table from '@material-ui/core/Table';
import DeleteIcon from '@material-ui/icons/Delete';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import FolderSpecialIcon from '@material-ui/icons/FolderSpecial';
import SchoolIcon from '@material-ui/icons/School';
import WorkIcon from '@material-ui/icons/Work';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Grid from '@material-ui/core/Grid';
import {Link, useRoute} from 'wouter';

// components, context and Services
import SessionContext from '../../../context/SessionContext';

import cvService from '../../../services/curriculums';
import TableAcademicExperience from '../../AcademicExperience/components/TableAcademicExperience';
import Notification from '../../../components/Notification';
import EditPersonalInfo from '../components/EditPersonalInfo';
import EditProfilePhoto from '../components/EditProfilePhoto';
import EditAcademicExperience from '../components/EditAcademicExperience';
import EditLaboralExperience from '../components/EditLaboralExperience';
import EditProjects from '../components/EditProjects';


const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
},
}))(TableRow);


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
                {...other}
            >
            {value === index && (
                <Box p={3}>
                <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
  
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
  }

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1)
        },
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    headerInfo: {
        '& > h2': {
            margin: 0
        }
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    },
    button: {
        margin: theme.spacing(1),
        marginRight: 0,
    },
    actionButtonsPage:{
        display: 'flex',
        justifyContent: 'flex-end'
    },
    body: {
        padding: '45px 0',
    },
    card: {
        width: '96%',
        margin: '0 auto',
        'display': 'flex',
        'flexDirection': 'column',
        'justifyContent': 'space-between'
    },
    actionsCard: {
        justifyContent: 'flex-end'
    },
    media: {
        height: '100px',
        backgroundSize: 'cover'
    },
    tab: {
        width: '100%'
    },
    actionButtonsTable:{
        display: 'flex',
        justifyContent: 'flex-end'
    },
    actionButtonsRow: {
        display: "flex",
        gap: "10px",
        justifyContent: 'flex-end',
        "& > svg": {
            cursor: "pointer"
        }
    }
}));


export default function EditCurriculum() {
    const classes = useStyles();
    const [match, params] = useRoute('/curriculums/edit/:id');
    const [value, setValue] = useState(0);
    const {session} = useContext(SessionContext);
    const [stateCv, setStateCv] = useState({});

    useEffect( () => {
        cvService.getUserCurriculumPopulated({Authorization: session.Authorization}, params.id)
        .then( (cv) => {
            setStateCv(cv);
            console.log('Curriculum to edit: ', cv)
        });
    }, [session.Authorization, params.id]);

    const onPreview = () => {
        console.log('on preview triggered');
    }

    const onExportPDF = () => {
        console.log('on export triggered');
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const onDeleteAcademicExperience = () => {

    }

    const transformDate = dateParam => {
        const date = new Date(dateParam);
        return parseInt(date.getDate()) +"/"+ parseInt(date.getMonth()+1) +"/"+date.getFullYear()
    };
    
    return (
        <div className="curriculumsEditContainer">
            <SubPage>
                <div className={classes.header}>
                    <div className={classes.headerLeft}>
                        <Link to="/curriculums">
                            <ArrowBackIcon style={{cursor: 'pointer'}} color="primary" />
                        </Link>
                        <div className={classes.headerInfo}>
                            <h2>Edit CV page</h2>
                            <small>Created at: {transformDate(stateCv.createdAt)}</small>
                        </div>
                    </div>
                    <div className={classes.actionButtonsPage}>
                        <Button variant="contained"
                            onClick={() => onPreview()}
                            color="primary"
                            className={classes.button}>
                            Preview CV
                        </Button>
                        <Button variant="contained"
                            onClick={() => onExportPDF()}
                            color="primary"
                            className={classes.button}>
                            Export to PDF
                        </Button>
                    </div>
                </div>
                <div className={classes.body}>
                    <Grid container spacing={4}>
                        <Grid container item xs={12} sm={4} spacing={3}>
                            <EditPersonalInfo classes={classes} session={session} cv={stateCv} updateCV={setStateCv}/>
                        </Grid>
                        <Grid container item xs={12} sm={4} spacing={3}>
                            <Card className={classes.card}>
                                <CardContent>
                                    <Typography variant="h5" component="h2">
                                        Template
                                    </Typography>
                                    <Typography variant="body2" align='left' component="p">
                                        The template manage system is not ready yet. This CV has assigned a default template.
                                    </Typography>
                                </CardContent>
                                <CardActions className={classes.actionsCard}>
                                    <Button variant="contained" color='primary' size="small" disabled>Select template</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid container item xs={12} sm={4} spacing={3}>
                            <EditProfilePhoto classes={classes} session={session} cv={stateCv} updateCV={setStateCv}/>
                        </Grid>
                        <Grid container item xs={12}>
                            <AppBar position="static">
                                <Tabs value={value} onChange={handleChange} variant="fullWidth" aria-label="simple tabs example">
                                    <Tab icon={<FolderSpecialIcon />} label="Projects" {...a11yProps(0)} />
                                    <Tab icon={<WorkIcon />} label="Laboral Experience" {...a11yProps(1)} />
                                    <Tab icon={<SchoolIcon />} label="Academic Experience" {...a11yProps(2)} />
                                </Tabs>
                            </AppBar>
                            <TabPanel className={classes.tab} value={value} index={0}>
                                <EditProjects classes={classes} session={session} cv={stateCv} updateCV={setStateCv}/>
                            </TabPanel>
                            <TabPanel className={classes.tab} value={value} index={1}>
                                <EditLaboralExperience classes={classes} session={session} cv={stateCv} updateCV={setStateCv}/>
                            </TabPanel>
                            <TabPanel className={classes.tab} value={value} index={2}>
                                <EditAcademicExperience classes={classes} session={session} cv={stateCv} updateCV={setStateCv}/>
                            </TabPanel>
                        </Grid>
                    </Grid>
                </div>
            </SubPage>
        </div>
    );
}