import React, {useState, useEffect} from 'react';

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
import cvService from '../../../services/curriculums';
import {Link} from 'wouter';

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
    actionButtonsRow: {
        display: "flex",
        gap: "10px",
        justifyContent: 'flex-end',
        "& > svg": {
            cursor: "pointer"
        }
    },
    cellDesc: {
        maxWidth: "600px",
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    }
}));

const TableCurriculums = ({curriculums, session}) => {
    const [cvs, setCvs] = useState([...curriculums]);

    useEffect(() => {
        setCvs(curriculums);
    }, [curriculums, session]);


    const [propsDialog, setPropsDialog] = useState({
        dialogState: false,
        title: '',
        bodyText: '',
        onAccept: () => {},
        onCancel: () => {}
    });
    const classes = useStyles();
    let bodyRows = cvs.map((cv) => {
        return {
            id: cv.id,
            content: {
                name: cv.name,
                description: cv.description,
                numProjects: cv.projects.length,
                language: cv.language,
            }
        }
    });
    const onEditRow = (cv_id) => {
        // console.log('click to edit cv', cv_id);
    }
    const onDeleteRow = (cv_id, cv_content) => {
        setPropsDialog({
            dialogState: true,
            title: 'Are you sure?',
            bodyText: `You are going to delete a CV with name "${cv_content.name}" completely with this action.`,
            onAccept: () => {
                cvService.deleteUserCurriculum({Authorization: session.Authorization}, cv_id)
                .then(() => {
                    const new_cvs = cvs.filter( cv => {
                        return cv.id !== cv_id
                    });
                    setCvs(new_cvs);
                    setPropsDialog({dialogState: false});
                }).catch(error => {
                    console.log('Deleted cv ERROR: ', error);
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
                <Link to={'/curriculums/create'}>
                    <Button variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<AddIcon />}>
                        Add CV
                    </Button>
                </Link>
            </div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="left">Name</StyledTableCell>
                            <StyledTableCell align="left">Description</StyledTableCell>
                            <StyledTableCell align="right">Num. Projects</StyledTableCell>
                            <StyledTableCell align="right">Language</StyledTableCell>
                            <StyledTableCell align="right">Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bodyRows.length ? 
                            bodyRows.map(({id, content}) => (
                                <StyledTableRow key={id}>
                                    <StyledTableCell align="left">{content.name}</StyledTableCell>
                                    <StyledTableCell className={classes.cellDesc} align="left">{content.description}</StyledTableCell>
                                    <StyledTableCell align="right">{content.numProjects}</StyledTableCell>
                                    <StyledTableCell align="right">{content.language}</StyledTableCell>
                                    <StyledTableCell className={classes.actionButtonsRow} align="justify">
                                        <Link href={`/curriculums/edit/${id}`}>
                                            <EditIcon aria-label="Edit CV" color="primary" fontSize="small" />
                                        </Link>
                                        <DeleteIcon aria-label="Delete CV" color="secondary" fontSize="small" onClick={() => onDeleteRow(id, content)} />
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))
                            :
                            <StyledTableRow key="NoData">
                                <StyledTableCell align="center" colSpan={5}>No data</StyledTableCell>
                            </StyledTableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <AlertDialog {...propsDialog} />
        </>
    )
}

export default TableCurriculums;
