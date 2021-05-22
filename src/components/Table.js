import React from 'react';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

  const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

const TableComponent = ({headerRows, bodyRows}) => {
    const classes = useStyles();

    bodyRows = [
        {
            contents: [
                {
                    fieldName: 'name',
                    content: 'Row 1',
                    align: 'left'
                },
                {
                    fieldName: 'description',
                    content: 'xcvsdxfvsdfgvsdrgvsrg',
                    align: 'left'
                },
                {
                    fieldName: 'numProjects',
                    content:  0,
                    align: 'right'
                },
                {
                    fieldName: 'language',
                    content: 'es',
                    align: 'right'
                }
            ],
            id: 'rrrt345hdfdfgh34fghd6',
        },
        {
            contents: [
                {
                    fieldName: 'name',
                    content: 'Row 1',
                    align: 'left'
                },
                {
                    fieldName: 'description',
                    content: 'xcvsdxfvsdfgvsdrgvsrg',
                    align: 'left'
                },
                {
                    fieldName: 'numProjects',
                    content:  0,
                    align: 'right'
                },
                {
                    fieldName: 'language',
                    content: 'es',
                    align: 'right'
                }
            ],
            id: 'rrccccrt345hdfdfgh34fghd6',
        },
        {
            contents: [
                {
                    fieldName: 'name',
                    content: 'Row 1',
                    align: 'left'
                },
                {
                    fieldName: 'description',
                    content: 'xcvsdxfvsdfgvsdrgvsrg',
                    align: 'left'
                },
                {
                    fieldName: 'numProjects',
                    content:  0,
                    align: 'right'
                },
                {
                    fieldName: 'language',
                    content: 'es',
                    align: 'right'
                }
            ],
            id: 'rrrt345hfffdfdfgh34fghd6',
        }
    ];
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        {bodyRows.map(({id, contents}) => {
                                const field = contents[0];
                                return (
                                    <StyledTableCell align={align} key={content}>{content}</StyledTableCell>
                                )
                            }
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {bodyRows.map(({id, contents}) => (
                        <StyledTableRow key={id}>
                                {contents.map(field => (
                                    <StyledTableCell align={field.align}>
                                        {field.content}
                                    </StyledTableCell>
                                ))}
                                
                                {/* <StyledTableCell align="right">{row.description}</StyledTableCell>
                                <StyledTableCell align="right">{row.numProjects}</StyledTableCell>
                                <StyledTableCell align="right">{row.language}</StyledTableCell> */}
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TableComponent;
