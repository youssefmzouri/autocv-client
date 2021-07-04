import React, {useState} from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import AlertDialog from '../../../components/AlertDialog';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import profilePhotoService from '../../../services/profilePhotos';
import cvService from '../../../services/curriculums';
import { useEffect } from 'react';


const useStyles = makeStyles((theme) => ({
    gridImages: {
        display: 'grid',
        gap: '1rem',
        gridTemplateColumns: 'repeat(auto-fill, minmax(9rem, 1fr))',
        margin: '20px 0 0 0'
    }
}));

const Image = ({id, src, alt, handleSelected}) => {
    const [isHovered, setHover] = useState(false);
  
    return (
      <div
        style={{
            position: "relative",
        }}
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <img src={src} alt={alt} />
        {isHovered && (
            <Button
                component="label"
                color="primary"
                style={{
                    position: "absolute",
                    top: "5px",
                    right: "5px"
                }}>
                <AddCircleIcon aria-label="select image" color="primary" fontSize="large" onClick={() => handleSelected(id, src)} />
            </Button>
        )}
      </div>
    );
};


function ListProfilePhotos({rows, handleSelectOne}) {
    const classes = useStyles();
    return (
        <div className={classes.gridImages}>
            {rows.map(row => {
                return <Image key={row.id} id={row.id} src={row.image} alt={row.ref} handleSelected={handleSelectOne} />
            })}
        </div>
    );
}


export default function EditProfilePhoto({classes, session, cv}) {
    const [image, setImage] = useState('');

    useEffect( () => {
        if (cv.profilePicture && cv.profilePicture.id) {
            setImage(cv.profilePicture.image);
        }
    }, [cv.profilePicture, session.Authorization]);

    const [propsDialog, setPropsDialog] = useState({
        dialogState: false,
        title: '',
        bodyText: '',
        showAcceptButon: false,
        onCancel: () => {}
    });

    const saveProfilePhotoSelected = async (id, src) => {
        console.log('selected photo: ', id);
        const data  = {
            profilePicture: id,
        };
        await cvService.updateUserCurriculum({"Authorization": session.Authorization}, cv.id, data);
        setImage(src);
        setPropsDialog({dialogState: false});
    }

    const handleSelectProfilePhoto = async () => {
        const data = await profilePhotoService.getUserProfilePhotos({Authorization: session.Authorization});
        
        setPropsDialog({
            dialogState: true,
            title: 'Which one do you want to include in your CV?',
            bodyText: <ListProfilePhotos rows={data} handleSelectOne={saveProfilePhotoSelected}/>,
            showAcceptButon: false,
            onCancel: () => {
                setPropsDialog({dialogState: false});
            }
        });
    }

    return (
        <>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.media}
                    image={image ? image : "/defaultAvatar.jpg"}
                    title="Default avatar"
                />
                <CardContent>
                    <Typography variant="h5" component="h2">
                        Profile photo
                    </Typography>
                    <Typography variant="body2" align='left' component="p">
                        { image ? 
                            'Picture selected'
                            :
                            "No photo is selected yet ..."
                        }
                    </Typography>
                </CardContent>
                <CardActions className={classes.actionsCard}>
                    <Button variant="contained" color='primary' size="small" onClick={handleSelectProfilePhoto}>Select picture</Button>
                </CardActions>
            </Card>
            <AlertDialog {...propsDialog} />
        </>
    );
}