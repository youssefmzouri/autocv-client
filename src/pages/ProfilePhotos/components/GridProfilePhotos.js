import React, {useState, useEffect} from 'react';

import { withStyles, makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
// import AlertDialog from '../../../components/AlertDialog';
// import laboralExpService from '../../../services/laboralExperience';
import {Link} from 'wouter';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
        justifyContent: 'end',
        marginRight: 0,
    },
    actionButtonsTable: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    gridImages: {
        display: 'grid',
        gap: '1rem',
        gridTemplateColumns: 'repeat(auto-fill, minmax(15rem, 1fr))',
        margin: '20px 0 0 0'
    }
}));

const GridProfilePhotos = ({photos, session}) => {
    const classes = useStyles();
    // const [stateLaboralExp, setStateLaboralExp] = useState([...academicExp]);

    useEffect(() => {
        // setStateLaboralExp(academicExp);
    }, [photos, session]);


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
                <Link to={'/profilePhotos/create'}>
                    <Button variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<AddPhotoAlternateIcon />}>
                        Upload new pic
                    </Button>
                </Link>
            </div>

            <div className={classes.gridImages}>
                {itemData.map((item) => (
                    <img
                        src={item.img}
                        alt={item.title}
                    />
                ))}
            </div>
            {/* <AlertDialog {...propsDialog} /> */}
        </>
    )
}

const itemData = [
    {
        img: 'https://i.pravatar.cc/300?img=1',
        title: 'Breakfast',
    },
    {
        img: 'https://i.pravatar.cc/300?img=12',
        title: 'Burger',
    },
    {
        img: 'https://i.pravatar.cc/300?img=3',
        title: 'Burger',
    },
    {
        img: 'https://i.pravatar.cc/300?img=44',
        title: 'Burger',
    },
    {
        img: 'https://i.pravatar.cc/300?img=5',
        title: 'Burger',
    },
    {
        img: 'https://i.pravatar.cc/300?img=55',
        title: 'Burger',
    },
    {
        img: 'https://i.pravatar.cc/300?img=67',
        title: 'Burger',
    },
    {
        img: 'https://i.pravatar.cc/300?img=8',
        title: 'Burger',
    },
];

export default GridProfilePhotos;