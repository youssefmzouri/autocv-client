import React, {useState, useEffect, useContext} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TableRow from '@material-ui/core/TableRow';
import AlertDialog from '../../../components/AlertDialog';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import AddIcon from '@material-ui/icons/Add';

import projectsService from '../../../services/projects';
import cvService from '../../../services/curriculums';
import SessionContext from '../../../context/SessionContext';
import useGithubAccessToken from '../../../hooks/useGithubAccessToken';
import TokenGithubStatus from '../../../pages/Projects/components/TokenGithubStatus';
import RepositoriesFromGithub from '../../../pages/Projects/components/RepositoriesFromGithub';


const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white
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

function ListProjects({rows, handleSelectOne}) {
    return (
        <div style={{display: 'flex', flexDirection: 'column' }}>
            {rows.map(row => {
                return <p key={row.id} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '15px' }}>
                    <span style={{color: 'black' }}>{row.name}</span>
                    <Button variant="contained" color="primary" onClick={() => handleSelectOne(row.id)}>Select</Button>
                </p>
            })}
        </div>
    );
}


function ListGithubProjects({handleSelectOne}) {
    const {session, setSession} = useContext(SessionContext);
    const {isLoadingToken, tokenGithub} =  useGithubAccessToken({session, setSession});
    return (
        <>
            <TokenGithubStatus isLoading={isLoadingToken} tokenGithub={tokenGithub}/>
            {
                tokenGithub && !isLoadingToken ?
                    <RepositoriesFromGithub canBeAdded={true} handleSelectRepo={handleSelectOne}/>
                    : null
            }
        </>
    );
}


export default function EditProjects({classes, session, cv, updateCV}) {
    let [projects, setProjects] = useState([]);

    useEffect( () => {
        if (cv.projects) {
            setProjects(cv.projects);
        }
    }, [cv.projects]);

    projects = projects.filter( (el) => {
        return el != null;
    });
    let bodyRows = projects.map((pr) => {
        return {
            id: pr.id,
            content: {
                ...pr
            }
        }
    });

    const [propsDialog, setPropsDialog] = useState({
        dialogState: false,
        title: '',
        bodyText: '',
        showAcceptButon: false,
        onCancel: () => {}
    });

    const saveProjectSelected = async (projectID) => {
        const pr = cv.projects.map(p => {
            return p.id;
        });
        const newIdExperiences = [...pr].concat(projectID);
        const data  = {
            projects: newIdExperiences,
        };
        const savedCV = await cvService.updateUserCurriculum({"Authorization": session.Authorization}, cv.id, data);
        const savedCVPopulated = await cvService.getUserCurriculumPopulated({"Authorization": session.Authorization}, savedCV.id);
        setProjects(savedCVPopulated.projects);
        setPropsDialog({dialogState: false});
        updateCV(savedCVPopulated);
    }

    const handleAddProject = async () => {
        const data = await projectsService.getUserProjects({Authorization: session.Authorization});
        
        setPropsDialog({
            dialogState: true,
            title: 'Which one do you want to include in your CV?',
            bodyText: <ListProjects rows={data} handleSelectOne={saveProjectSelected}/>,
            showAcceptButon: false,
            onCancel: () => {
                setPropsDialog({dialogState: false});
            }
        });
    }

    const saveGithubProjectSelected = async (repo) => {
        const data = {
            isFromGithub: true,
            githubUri: repo.html_url,
            ...repo
        };
        const project = await projectsService.postUserProjects({"Authorization": session.Authorization}, data);
        saveProjectSelected(project.id);
    }

    const handleAddProjectFromGithub = async () => {
        setPropsDialog({
            dialogState: true,
            title: 'Which one do you want to include in your CV?',
            bodyText: <ListGithubProjects handleSelectOne={saveGithubProjectSelected}/>,
            showAcceptButon: false,
            onCancel: () => {
                setPropsDialog({dialogState: false});
            }
        });
    }
    
    const onDeleteProject = async (projectID) => {
        let newIdExperiences = cv.projects.map(project => {
            if (projectID !== project.id) {
                return project.id;
            }
        });
        newIdExperiences = newIdExperiences.filter( (el) => {
            return el !== null && el !== undefined;
        });
        const data  = {
            projects: newIdExperiences
        };
        const savedCV = await cvService.updateUserCurriculum({"Authorization": session.Authorization}, cv.id, data);
        const savedCVPopulated = await cvService.getUserCurriculumPopulated({"Authorization": session.Authorization}, savedCV.id);
        setProjects(savedCVPopulated.projects);
        updateCV(savedCVPopulated);
    }

    const transformDate = dateParam => {
        const date = new Date(dateParam);
        return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`;
    };

    return (
        <>
            <div className={classes.actionButtonsTable}>
                <Button variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<AddIcon />}
                    onClick={handleAddProject}>
                    Add Project
                </Button>
                <Button variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<AddIcon />}
                    onClick={handleAddProjectFromGithub}>
                    Add Project from github 
                </Button>
            </div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="left">Name</StyledTableCell>
                            <StyledTableCell align="left">Description</StyledTableCell>
                            <StyledTableCell align="right">UpdatedAt</StyledTableCell>
                            <StyledTableCell align="right">Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bodyRows.length ? 
                            bodyRows.map(({id, content}) => (
                                <StyledTableRow key={id}>
                                    <StyledTableCell align="left">{content.name}</StyledTableCell>
                                    <StyledTableCell align="left">
                                        <div className={classes.textContainer}>
                                            {content.description}
                                        </div>
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{transformDate(content.updatedAt)}</StyledTableCell>
                                    <StyledTableCell className={classes.actionButtonsRow} align="justify">
                                        <DeleteIcon aria-label="Delete Project" color="secondary" fontSize="small" onClick={() => onDeleteProject(id)} />
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))
                            :
                            <StyledTableRow key="NoData">
                                <StyledTableCell align="center" colSpan={4}>No data</StyledTableCell>
                            </StyledTableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <AlertDialog {...propsDialog} />
        </>
    );
}