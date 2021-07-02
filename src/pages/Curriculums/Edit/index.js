import React, {useState, useContext} from 'react';
import SubPage from '../../../components/SubPage';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

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
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';

import {Link} from 'wouter';
import cvService from '../../../services/curriculums';
import Notification from '../../../components/Notification';
import SessionContext from '../../../context/SessionContext';

import TableAcademicExperience from '../../AcademicExperience/components/TableAcademicExperience';


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
    },
}));


export default function EditCurriculum() {
    const classes = useStyles();
    const [value, setValue] = useState(0);

    const {session} = useContext(SessionContext);

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
    
    return (
        <div className="curriculumsEditContainer">
            <SubPage>
                <div className={classes.header}>
                    <div className={classes.headerInfo}>
                        <h2>Edit CV page</h2>
                        <small>Created at: 20/06/2021</small>
                    </div>
                    <div className={classes.actionButtonsPage}>
                        <Button variant="contained"
                            onClick={onPreview()}
                            color="primary"
                            className={classes.button}>
                            Preview CV
                        </Button>
                        <Button variant="contained"
                            onClick={onExportPDF()}
                            color="primary"
                            className={classes.button}>
                            Export to PDF
                        </Button>
                    </div>
                </div>
                <div className={classes.body}>
                    <Grid container spacing={4}>
                        <Grid container item xs={12} sm={4} spacing={3}>
                            <Card className={classes.card}>
                                <CardContent>
                                    <Typography variant="h5" component="h2">
                                        Profile info
                                    </Typography>
                                    <Typography variant="body2" align='left' component="p">
                                        Nothing selected yet ...
                                    </Typography>
                                </CardContent>
                                <CardActions className={classes.actionsCard}>
                                    <Button variant="contained" color='primary' size="small">Select profile info</Button>
                                </CardActions>
                            </Card>
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
                            <Card className={classes.card}>
                                <CardMedia
                                    className={classes.media}
                                    image="/defaultAvatar.jpg"
                                    title="Default avatar"
                                />
                                <CardContent>
                                    <Typography variant="h5" component="h2">
                                        Profile photo
                                    </Typography>
                                    <Typography variant="body2" align='left' component="p">
                                        Any photo is selected yet ...
                                    </Typography>
                                </CardContent>
                                <CardActions className={classes.actionsCard}>
                                    <Button variant="contained" color='primary' size="small">Select picture</Button>
                                </CardActions>
                            </Card>
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
                                Item one
                            </TabPanel>
                            <TabPanel className={classes.tab} value={value} index={1}>
                                Item Two
                            </TabPanel>
                            <TabPanel className={classes.tab} value={value} index={2}>
                                <div className={classes.actionButtonsTable}>
                                    <Link to={'/academicexperiences/create'}>
                                        <Button variant="contained"
                                            color="primary"
                                            className={classes.button}
                                            startIcon={<AddIcon />}>
                                            Add Experience
                                        </Button>
                                    </Link>
                                </div>
                                <TableContainer component={Paper}>
                                    <Table className={classes.table} aria-label="customized table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell align="left">School</StyledTableCell>
                                                <StyledTableCell align="left">Name Degree</StyledTableCell>
                                                <StyledTableCell align="right">End year</StyledTableCell>
                                                <StyledTableCell align="right">Actions</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <StyledTableRow >
                                                <StyledTableCell align="left">Institut IES Thos i Codina</StyledTableCell>
                                                <StyledTableCell align="left">Técnico en sistemas micorinformáticos y redes</StyledTableCell>
                                                <StyledTableCell align="right">2012</StyledTableCell>
                                                <StyledTableCell className={classes.actionButtonsRow} align="justify">
                                                    <DeleteIcon aria-label="Delete Experience" color="secondary" fontSize="small" onClick={() => onDeleteAcademicExperience('id', 'content')} />
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </TabPanel>
                        </Grid>
                    </Grid>
                </div>
            </SubPage>
        </div>
    );
}