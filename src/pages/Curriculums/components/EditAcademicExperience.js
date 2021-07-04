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

import academicExpService from '../../../services/academicExperience';
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

function ListAcademicExperience({rows, handleSelectOne}) {
    return (
        <div style={{display: 'flex', flexDirection: 'column' }}>
            {rows.map(row => {
                return <p key={row.id} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '15px' }}>
                    <span style={{color: 'black' }}>{row.degree}</span>
                    <Button variant="contained" color="primary" onClick={() => handleSelectOne(row.id)}>Select</Button>
                </p>
            })}
        </div>
    );
}


export default function EditAcademicExperience({classes, session, cv, updateCV}) {
    let [experiences, setExperiences] = useState([]);

    useEffect( () => {
        if (cv.academicExperiences) {
            setExperiences(cv.academicExperiences);
        }
    }, [cv.academicExperiences]);

    experiences = experiences.filter( (el) => {
        return el != null;
    });
    let bodyRows = experiences.map((acaExp) => {
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
        showAcceptButon: false,
        onCancel: () => {}
    });

    const saveAcademicExperienceSelected = async (experienceID) => {
        console.log('experiencias: ', cv.academicExperiences);
        const exps = cv.academicExperiences.map(exp => {
            return exp.id;
        });
        const newIdExperiences = [...exps].concat(experienceID);
        const data  = {
            academicExperiences: newIdExperiences,
        };
        const savedCV = await cvService.updateUserCurriculum({"Authorization": session.Authorization}, cv.id, data);
        const savedCVPopulated = await cvService.getUserCurriculumPopulated({"Authorization": session.Authorization}, savedCV.id);
        setExperiences(savedCVPopulated.academicExperiences);
        setPropsDialog({dialogState: false});
        updateCV(savedCVPopulated);
    }

    const handleAddAcademicExperience = async () => {
        const data = await academicExpService.getUserAcademicExp({Authorization: session.Authorization});
        
        setPropsDialog({
            dialogState: true,
            title: 'Which one do you want to include in your CV?',
            bodyText: <ListAcademicExperience rows={data} handleSelectOne={saveAcademicExperienceSelected}/>,
            showAcceptButon: false,
            onCancel: () => {
                setPropsDialog({dialogState: false});
            }
        });
    }
    
    const onDeleteAcademicExperience = async (experienceID) => {
        let newIdExperiences = cv.academicExperiences.map(exp => {
            if (experienceID !== exp.id) {
                return exp.id;
            }
        });
        newIdExperiences = newIdExperiences.filter( (el) => {
            return el !== null && el !== undefined;
        });
        const data  = {
            academicExperiences: newIdExperiences
        };
        console.log('array a enviar: ', data);
        const savedCV = await cvService.updateUserCurriculum({"Authorization": session.Authorization}, cv.id, data);
        const savedCVPopulated = await cvService.getUserCurriculumPopulated({"Authorization": session.Authorization}, savedCV.id);
        setExperiences(savedCVPopulated.academicExperiences);
        updateCV(savedCVPopulated);
    }

    const transformDate = dateParam => {
        const date = new Date(dateParam);
        return date.getFullYear();
    };

    return (
        <>
            <div className={classes.actionButtonsTable}>
                <Button variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<AddIcon />}
                    onClick={handleAddAcademicExperience}>
                    Add Experience
                </Button>
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
                                        <DeleteIcon aria-label="Delete Experience" color="secondary" fontSize="small" onClick={() => onDeleteAcademicExperience(id)} />
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