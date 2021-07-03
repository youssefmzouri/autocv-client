import {useEffect, useState} from 'react';
import academicExpService from '../services/academicExperience';

export default function useAcademicExperience({auth} = {auth: null}) {
    const [academicExp, setAcademicExp] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect( () => {
        academicExpService.getUserAcademicExp({Authorization: auth})
        .then(result => {
            setAcademicExp(result);
            console.log('Acaemic Experience: ', result);
        }).catch(error => {
            console.error('Error getting academic exp', error);
        });
        setLoading(false);
    }, [auth, setAcademicExp]);
    
    return {loading, academicExp};
}