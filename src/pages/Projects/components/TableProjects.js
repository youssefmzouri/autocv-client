import React from 'react';

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
    textContainer: {
        display: 'block',
        maxWidth: '550px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    }
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

const TableProjects = ({projects}) => {
    const classes = useStyles();
    let bodyRows = projects.map((project) => {
        return {
            id: project.id,
            content: {
                name: project.name,
                description: project.description,
                updatedAt: formatDate(project.updatedAt),
            }
        }
    });
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
                                    <StyledTableCell align="right">
                                        some action buttons
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
        </>
    )
}

export default TableProjects;
