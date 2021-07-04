import React, {useState, useEffect} from 'react';

import { withStyles, makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import DeleteIcon from '@material-ui/icons/Delete';
import AlertDialog from '../../../components/AlertDialog';
import profilePhotosService from '../../../services/profilePhotos';


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
    let [statePhotos, setStatePhotos] = useState([...photos]);

    useEffect(() => {
        setStatePhotos(photos);
    }, [photos, session]);


    const [propsDialog, setPropsDialog] = useState({
        dialogState: false,
        title: '',
        bodyText: '',
        showAcceptButon: true,
        onAccept: () => {},
        onCancel: () => {}
    });
    let bodyRows = statePhotos.map((picture) => {
        return {
            id: picture.id,
            content: {
                ...picture
            }
        }
    });

    const onDeleteImage = (id) => {
        console.log('Delete image: ', id)
        setPropsDialog({
            dialogState: true,
            title: 'Are you sure?',
            bodyText: `You are going to delete an image with ID "${id}" completely with this action.`,
            showAcceptButon: true,
            onAccept: () => {
                profilePhotosService.deleteUserProfilePhoto({Authorization: session.Authorization}, id)
                .then(() => {
                    const new_pics = statePhotos.filter( pic => {
                        return pic.id !== id
                    });
                    setStatePhotos(new_pics);
                    setPropsDialog({dialogState: false});
                }).catch(error => {
                    console.log('Deleted pic ERROR: ', error);
                    setPropsDialog({dialogState: false});
                });
            },
            onCancel: () => {
                setPropsDialog({dialogState: false});
            }
        });
    }

    const getBase64 = file => {
        return new Promise(resolve => {
            // Make new FileReader
            let reader = new FileReader();

            // Convert the file to base64 text
            reader.readAsDataURL(file);

            // on reader load somthing...
            reader.onload = () => {
                // Make a fileInfo Object
                resolve(reader.result);
            };
        });
    };

    const handleUpload = (event) => {
        const image = event.target.files[0];
        // console.log('Imagen subida: ', image);
        if (image.type === "image/jpeg") {
            getBase64(image)
            .then(async (base64) => {
                const data = {
                    ref: image.name,
                    image: base64
                };
                const newPic = await profilePhotosService.postUserProfilePhoto({"Authorization": session.Authorization}, data);
                setStatePhotos([
                    ...statePhotos,
                    newPic
                ]);
            })
            .catch(err => {
                console.log('Error uploading image: ', err);
            });
        } else {
            // show notification error ... 
        }
    }

    const Image = ({id, src, alt}) => {
        const [isHovered, setHover] = useState(false);
      
        return (
          <div
            style={{
                position: "relative"
            }}
            onMouseOver={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <img src={src} alt={alt} />
            {isHovered && (
                <Button
                    component="label"
                    color="secondary"
                    style={{
                        position: "absolute",
                        top: "5px",
                        right: "5px"
                    }}>
                    <DeleteIcon aria-label="Delete image" color="secondary" fontSize="large" onClick={() => onDeleteImage(id)} />
                </Button>
            )}
          </div>
        );
    };

    return (
        <>
            <div className={classes.actionButtonsTable}>
                <Button variant="contained"
                    component="label"
                    color="primary"
                    className={classes.button}
                    startIcon={<AddPhotoAlternateIcon />}>
                    Upload new pic
                    <input type="file" hidden onChange={handleUpload} />
                </Button>
            </div>

            <div className={classes.gridImages}>
                {bodyRows.map( ({id, content}) => (
                    <Image
                        key={id}
                        id={id}
                        alt={content.ref}
                        src={content.image}
                    />
                ))}
            </div>
            <AlertDialog {...propsDialog} />
        </>
    )
}

export default GridProfilePhotos;