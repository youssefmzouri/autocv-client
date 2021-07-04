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
import personalInfoService from '../../../services/personalInfo';
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

const TablePersonalInfo = ({personalInfo, session}) => {
    const classes = useStyles();
    const [statePersonalInfo, setStatePersonalInfo] = useState([...personalInfo]);

    useEffect(() => {
        setStatePersonalInfo(personalInfo);
    }, [personalInfo, session]);


    const [propsDialog, setPropsDialog] = useState({
        dialogState: false,
        title: '',
        bodyText: '',
        onAccept: () => {},
        onCancel: () => {}
    });
    let bodyRows = statePersonalInfo.map((up) => {
        return {
            id: up.id,
            content: {
                ...up
            }
        }
    });
    const onDeleteRow = (id, content) => {
        setPropsDialog({
            dialogState: true,
            title: 'Are you sure?',
            bodyText: `You are going to delete a personal information with ID "${content.id}" completely with this action.`,
            onAccept: () => {
                personalInfoService.deleteUserPersonalInfo({Authorization: session.Authorization}, id)
                .then(() => {
                    const new_personalInformation = statePersonalInfo.filter( up => {
                        return up.id !== id
                    });
                    setStatePersonalInfo(new_personalInformation);
                    setPropsDialog({dialogState: false});
                }).catch(error => {
                    console.log('Deleted personal information ERROR: ', error);
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
                <Link to={'/personalInfo/create'}>
                    <Button variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<AddIcon />}>
                        Add personal information
                    </Button>
                </Link>
            </div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="left">ID</StyledTableCell>
                            <StyledTableCell align="left">Contact Email</StyledTableCell>
                            <StyledTableCell align="left">Contact phone</StyledTableCell>
                            <StyledTableCell align="left">Github user</StyledTableCell>
                            <StyledTableCell align="left">Linkedin user</StyledTableCell>
                            <StyledTableCell align="left">Web page</StyledTableCell>
                            <StyledTableCell align="left">City</StyledTableCell>
                            <StyledTableCell align="right">Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bodyRows.length ? 
                            bodyRows.map(({id, content}) => (
                                <StyledTableRow key={id}>
                                    <StyledTableCell align="left">{id}</StyledTableCell>
                                    <StyledTableCell align="left">{content.contactEmail}</StyledTableCell>
                                    <StyledTableCell align="left">{content.contactPhone}</StyledTableCell>
                                    <StyledTableCell align="right">{content.githubUser}</StyledTableCell>
                                    <StyledTableCell align="right">{content.linkedinUser}</StyledTableCell>
                                    <StyledTableCell align="right">{content.web}</StyledTableCell>
                                    <StyledTableCell align="right">{content.city}</StyledTableCell>
                                    <StyledTableCell className={classes.actionButtonsRow} align="justify">
                                        <Link href={`/personalInfo/edit/${id}`}>
                                            <EditIcon aria-label="Edit Project" color="primary" fontSize="small" />
                                        </Link>
                                        <DeleteIcon aria-label="Delete Experience" color="secondary" fontSize="small" onClick={() => onDeleteRow(id, content)} />
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))
                            :
                            <StyledTableRow key="NoData">
                                <StyledTableCell align="center" colSpan={8}>No data</StyledTableCell>
                            </StyledTableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <AlertDialog {...propsDialog} />
        </>
    )
}

export default TablePersonalInfo;
