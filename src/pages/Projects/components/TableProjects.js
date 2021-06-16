import React, {useEffect, useState} from 'react';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AlertDialog from '../../../components/AlertDialog';
import {Link} from 'wouter';

import projectsService from '../../../services/projects';

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

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 700,
    },
    button: {
        margin: theme.spacing(1),
        justifyContent: 'end',
        marginRight: 0,
    },
    actionButtonsTable: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    textContainer: {
        display: 'block',
        maxWidth: '550px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
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

const formatDate = (date) => {
    let datetime = new Date(date);
    return datetime.getDate() + "/" +
        (datetime.getMonth() + 1) + "/" +
        datetime.getFullYear() + " " +
        datetime.getHours() + ":" +
        datetime.getMinutes() + ":" +
        datetime.getSeconds();
}

const TableProjects = ({projects, session}) => {
    const [stateProjects, setStateProjects] = useState([...projects]);

    useEffect(() => {
        setStateProjects(projects);
    }, [projects, session]);

    const [propsDialog, setPropsDialog] = useState({
        dialogState: false,
        title: '',
        bodyText: '',
        onAccept: () => {},
        onCancel: () => {}
    });

    const classes = useStyles();
    let bodyRows = stateProjects.map((project) => {
        return {
            id: project.id,
            content: {
                name: project.name,
                description: project.description,
                updatedAt: formatDate(project.updatedAt),
            }
        }
    });

    const onDeleteRow = (project_id, project_content) => {
        setPropsDialog({
            dialogState: true,
            title: 'Are you sure?',
            bodyText: `You are going to delete a project with name "${project_content.name}" completely with this action.`,
            onAccept: () => {
                projectsService.deleteUserProjects({Authorization: session.Authorization}, project_id)
                .then(() => {
                    const new_projects = stateProjects.filter( project => {
                        return project.id !== project_id
                    });
                    setStateProjects(new_projects);
                    setPropsDialog({dialogState: false});
                }).catch(error => {
                    console.log('Deleted project ERROR: ', error);
                    setPropsDialog({dialogState: false});
                });
            },
            onCancel: () => {
                setPropsDialog({dialogState: false});
            }
        });
    }
    return (
        <>
            <div className={classes.actionButtonsTable}>
                <Link to={'/projects/create'}>
                    <Button variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<AddIcon />}>
                        Add Project
                    </Button>
                </Link>
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
                                    <StyledTableCell align="right">{content.updatedAt}</StyledTableCell>
                                    <StyledTableCell className={classes.actionButtonsRow} align="justify">
                                        <Link href={`/projects/edit/${id}`}>
                                            <EditIcon aria-label="Edit Project" color="primary" fontSize="small" />
                                        </Link>
                                        <DeleteIcon aria-label="Delete Project" color="secondary" fontSize="small" onClick={() => onDeleteRow(id, content)} />
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
    )
}

export default TableProjects;
