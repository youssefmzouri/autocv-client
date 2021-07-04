import React, {useState} from 'react';
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

import laboralExpService from '../../../services/laboralExperience';
import cvService from '../../../services/curriculums';
import { useEffect } from 'react';


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


function transformDate(dateParam){
    const date = new Date(dateParam);
    return parseInt(date.getMonth()+1) +"/"+date.getFullYear()
};

function ListLaboralExperience({rows, handleSelectOne}) {
    return (
        <div style={{display: 'flex', flexDirection: 'column' }}>
            {rows.map(row => {
                return <p key={row.id} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '15px' }}>
                    <span style={{color: 'black' }}>{row.companyName} ({transformDate(row.startDate)} - {transformDate(row.endDate)})</span>
                    <Button variant="contained" color="primary" onClick={() => handleSelectOne(row.id)}>Select</Button>
                </p>
            })}
        </div>
    );
}


export default function EditLaboralExperience({classes, session, cv, updateCV}) {
    let [experiences, setExperiences] = useState([]);

    useEffect( () => {
        if (cv.laboralExperiences) {
            setExperiences(cv.laboralExperiences);
        }
    }, [cv.laboralExperiences]);

    experiences = experiences.filter( (el) => {
        return el != null;
    });
    let bodyRows = experiences.map((exp) => {
        return {
            id: exp.id,
            content: {
                ...exp
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

    const saveLaboralExperienceSelected = async (experienceID) => {
        console.log('experiencias: ', cv.laboralExperiences);
        const exps = cv.laboralExperiences.map(exp => {
            return exp.id;
        });
        const newIdExperiences = [...exps].concat(experienceID);
        const data  = {
            laboralExperiences: newIdExperiences,
        };
        const savedCV = await cvService.updateUserCurriculum({"Authorization": session.Authorization}, cv.id, data);
        const savedCVPopulated = await cvService.getUserCurriculumPopulated({"Authorization": session.Authorization}, savedCV.id);
        setExperiences(savedCVPopulated.laboralExperiences);
        setPropsDialog({dialogState: false});
        updateCV(savedCVPopulated);
    }

    const handleAddLaboralExperience = async () => {
        const data = await laboralExpService.getUserLaboralExp({Authorization: session.Authorization});
        
        setPropsDialog({
            dialogState: true,
            title: 'Which one do you want to include in your CV?',
            bodyText: <ListLaboralExperience rows={data} handleSelectOne={saveLaboralExperienceSelected}/>,
            showAcceptButon: false,
            onCancel: () => {
                setPropsDialog({dialogState: false});
            }
        });
    }
    
    const onDeleteLaboralExperience = async (experienceID) => {
        let newIdExperiences = cv.laboralExperiences.map(exp => {
            if (experienceID !== exp.id) {
                return exp.id;
            }
        });
        newIdExperiences = newIdExperiences.filter( (el) => {
            return el !== null && el !== undefined;
        });
        const data  = {
            laboralExperiences: newIdExperiences
        };
        console.log('array a enviar: ', data);
        const savedCV = await cvService.updateUserCurriculum({"Authorization": session.Authorization}, cv.id, data);
        const savedCVPopulated = await cvService.getUserCurriculumPopulated({"Authorization": session.Authorization}, savedCV.id);
        setExperiences(savedCVPopulated.laboralExperiences);
        updateCV(savedCVPopulated);
    }

    return (
        <>
            <div className={classes.actionButtonsTable}>
                <Button variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<AddIcon />}
                    onClick={handleAddLaboralExperience}>
                    Add Experience
                </Button>
            </div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="left">Company name</StyledTableCell>
                            <StyledTableCell align="left">Postition</StyledTableCell>
                            <StyledTableCell align="right">Start date</StyledTableCell>
                            <StyledTableCell align="right">End date</StyledTableCell>
                            <StyledTableCell align="right">Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bodyRows.length ? 
                            bodyRows.map(({id, content}) => (
                                <StyledTableRow key={id}>
                                    <StyledTableCell align="left">{content.companyName}</StyledTableCell>
                                    <StyledTableCell align="left">{content.position}</StyledTableCell>
                                    <StyledTableCell align="right">{transformDate(content.startDate)}</StyledTableCell>
                                    <StyledTableCell align="right">{content.stillActive ? 'Still working here' : transformDate(content.endDate)}</StyledTableCell>
                                    <StyledTableCell className={classes.actionButtonsRow} align="justify">
                                        <DeleteIcon aria-label="Delete Experience" color="secondary" fontSize="small" onClick={() => onDeleteLaboralExperience(id)} />
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
    );
}