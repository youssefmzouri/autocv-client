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
    }
}));

const TableCurriculums = ({curriculums}) => {
    const classes = useStyles();
    let bodyRows = curriculums.map((cv) => {
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
                        {bodyRows.map(({id, content}) => (
                            <StyledTableRow key={id}>
                                <StyledTableCell align="left">{content.name}</StyledTableCell>
                                <StyledTableCell align="left">{content.description}</StyledTableCell>
                                <StyledTableCell align="right">{content.numProjects}</StyledTableCell>
                                <StyledTableCell align="right">{content.language}</StyledTableCell>
                                <StyledTableCell align="right">
                                    some action buttons
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default TableCurriculums;
