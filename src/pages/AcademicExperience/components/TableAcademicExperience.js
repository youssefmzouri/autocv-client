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
import academicExpService from '../../../services/academicExperience';
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

const TableAcademicExperience = ({academicExp, session}) => {
    const classes = useStyles();
    const [stateAcademicExp, setStateAcademicExp] = useState([...academicExp]);

    useEffect(() => {
        setStateAcademicExp(academicExp);
    }, [academicExp, session]);

    let bodyRows = stateAcademicExp.map((acaExp) => {
        return {
            id: acaExp.id,
            content: {
                ...acaExp
            }
        }
    });

    const [propsDialog, setPropsDialog] = useState({
        dialogState: false,
        title: '',
        bodyText: '',
        showAcceptButon: true,
        onAccept: () => {},
        onCancel: () => {}
    });

    const onDeleteRow = (id, content) => {
        console.log('deleting academic experience ...', id);
        setPropsDialog({
            dialogState: true,
            title: 'Are you sure?',
            bodyText: `You are going to delete an academic experience as a "${content.degree}" completely with this action.`,
            showAcceptButon: true,
            onAccept: () => {
                academicExpService.deleteUserAcademicExp({Authorization: session.Authorization}, id)
                .then(() => {
                    const new_acaExps = stateAcademicExp.filter( cv => {
                        return cv.id !== id
                    });
                    setStateAcademicExp(new_acaExps);
                    setPropsDialog({dialogState: false});
                }).catch(error => {
                    console.log('Deleted academic experience ERROR: ', error);
                    setPropsDialog({dialogState: false});
                });
            },
            onCancel: () => {
                setPropsDialog({dialogState: false});
            }
        });
    }

    const transformDate = dateParam => {
        const date = new Date(dateParam);
        return date.getFullYear();
    };
    return (
        <>
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
                        {bodyRows.length ? 
                            bodyRows.map(({id, content}) => (
                                <StyledTableRow key={id}>
                                    <StyledTableCell align="left">{content.school}</StyledTableCell>
                                    <StyledTableCell align="left">{content.degree}</StyledTableCell>
                                    <StyledTableCell align="right">{content.stillActive ? 'Not finished yet' : transformDate(content.endYear)}</StyledTableCell>
                                    <StyledTableCell className={classes.actionButtonsRow} align="justify">
                                        <Link href={`/academicexperiences/edit/${id}`}>
                                            <EditIcon aria-label="Edit Project" color="primary" fontSize="small" />
                                        </Link>
                                        <DeleteIcon aria-label="Delete Experience" color="secondary" fontSize="small" onClick={() => onDeleteRow(id, content)} />
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

export default TableAcademicExperience;
