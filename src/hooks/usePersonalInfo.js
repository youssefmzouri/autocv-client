import {useEffect, useState} from 'react';
import personalInfoService from '../services/personalInfo';

export default function usePersonalInfo({auth} = {auth: null}) {
    const [personalInfo, setPersonalInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect( () => {
        personalInfoService.getUserPersonalInfo({Authorization: auth})
        .then(result => {
            setPersonalInfo(result);
            console.log('Personal info: ', result);
        }).catch(error => {
            console.error('Error getting personal info', error);
        });
        setLoading(false);
    }, [auth, setPersonalInfo]);
    
    return {loading, personalInfo};
}