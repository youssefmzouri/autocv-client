import {useEffect, useState} from 'react';
import profilePhotosService from '../services/profilePhotos';

export default function useProfilePhotos({auth} = {auth: null}) {
    const [profilePhotos, setProfilePhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect( () => {
        profilePhotosService.getUserProfilePhotos({Authorization: auth})
        .then(result => {
            setProfilePhotos(result);
            console.log('Profile photos: ', result);
            setLoading(false);
        }).catch(error => {
            setLoading(false);
            console.error('Error getting picture', error);
        });
    }, [auth, setProfilePhotos]);
    
    return {loading, profilePhotos};
}