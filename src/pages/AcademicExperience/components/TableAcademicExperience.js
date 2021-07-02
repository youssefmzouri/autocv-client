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
import laboralExpService from '../../../services/laboralExperience';
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
    // const [stateLaboralExp, setStateLaboralExp] = useState([...academicExp]);

    useEffect(() => {
        // setStateLaboralExp(academicExp);
    }, [academicExp, session]);


    // const [propsDialog, setPropsDialog] = useState({
    //     dialogState: false,
    //     title: '',
    //     bodyText: '',
    //     onAccept: () => {},
    //     onCancel: () => {}
    // });
    // let bodyRows = stateLaboralExp.map((lexp) => {
    //     return {
    //         id: lexp.id,
    //         content: {
    //             name: lexp.name,
    //             description: lexp.description,
    //             numProjects: lexp.projects.length,
    //             language: lexp.language,
    //         }
    //     }
    // });
    const onEditRow = (id) => {
        // console.log('click to edit cv', cv_id);
    }
    const onDeleteRow = (id, content) => {
        // setPropsDialog({
        //     dialogState: true,
        //     title: 'Are you sure?',
        //     bodyText: `You are going to delete a laboral experience with name "${content.name}" completely with this action.`,
        //     onAccept: () => {
        //         laboralExpService.deleteUserCurriculum({Authorization: session.Authorization}, id)
        //         .then(() => {
        //             const new_cvs = stateLaboralExp.filter( cv => {
        //                 return cv.id !== id
        //             });
        //             setStateLaboralExp(new_cvs);
        //             setPropsDialog({dialogState: false});
        //         }).catch(error => {
        //             console.log('Deleted cv ERROR: ', error);
        //             setPropsDialog({dialogState: false});
        //         });
        //     },
        //     onCancel: () => {
        //         setPropsDialog({dialogState: false});
        //     }
        // });
    }
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
                        {/* {bodyRows.length ? 
                            bodyRows.map(({id, content}) => (
                                <StyledTableRow key={id}>
                                    <StyledTableCell align="left">{content.companyName}</StyledTableCell>
                                    <StyledTableCell align="left">{content.position}</StyledTableCell>
                                    <StyledTableCell align="right">{content.startDate}</StyledTableCell>
                                    <StyledTableCell align="right">{content.endDate}</StyledTableCell>
                                    <StyledTableCell className={classes.actionButtonsRow} align="justify">
                                        <EditIcon aria-label="Edit Experience" color="primary" fontSize="small" onClick={() => onEditRow(id)} />
                                        <DeleteIcon aria-label="Delete Experience" color="secondary" fontSize="small" onClick={() => onDeleteRow(id, content)} />
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))
                            :
                            <StyledTableRow key="NoData">
                                <StyledTableCell align="center" colSpan={5}>No data</StyledTableCell>
                            </StyledTableRow>
                        } */}

                        <StyledTableRow >
                            <StyledTableCell align="left">Institut IES Thos i Codina</StyledTableCell>
                            <StyledTableCell align="left">Técnico en sistemas micorinformáticos y redes</StyledTableCell>
                            <StyledTableCell align="right">2012</StyledTableCell>
                            <StyledTableCell className={classes.actionButtonsRow} align="justify">
                                <EditIcon aria-label="Edit Experience" color="primary" fontSize="small" onClick={() => onEditRow('id')} />
                                <DeleteIcon aria-label="Delete Experience" color="secondary" fontSize="small" onClick={() => onDeleteRow('id', 'content')} />
                            </StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow >
                            <StyledTableCell align="left">Institut IES Thos i Codina</StyledTableCell>
                            <StyledTableCell align="left">Técnico superior en desarollo de aplicaciones web</StyledTableCell>
                            <StyledTableCell align="right">2016</StyledTableCell>
                            <StyledTableCell className={classes.actionButtonsRow} align="justify">
                                <EditIcon aria-label="Edit Experience" color="primary" fontSize="small" onClick={() => onEditRow('id')} />
                                <DeleteIcon aria-label="Delete Experience" color="secondary" fontSize="small" onClick={() => onDeleteRow('id', 'content')} />
                            </StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow >
                            <StyledTableCell align="left">Universitat Autonoma de Barcelona</StyledTableCell>
                            <StyledTableCell align="left">Graduado en Ingenieria de Software</StyledTableCell>
                            <StyledTableCell align="right">2021</StyledTableCell>
                            <StyledTableCell className={classes.actionButtonsRow} align="justify">
                                <EditIcon aria-label="Edit Experience" color="primary" fontSize="small" onClick={() => onEditRow('id')} />
                                <DeleteIcon aria-label="Delete Experience" color="secondary" fontSize="small" onClick={() => onDeleteRow('id', 'content')} />
                            </StyledTableCell>
                        </StyledTableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            {/* <AlertDialog {...propsDialog} /> */}
        </>
    )
}

export default TableAcademicExperience;
