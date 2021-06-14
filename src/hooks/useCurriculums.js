import {useEffect, useState} from 'react';
import cvService from '../services/curriculums';

export default function useCurriculums({auth} = {auth: null}) {
    const [curriculums, setCurriculums] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect( () => {
        cvService.getUserCurriculums({Authorization: auth})
        .then(resultCvs => {
            setCurriculums(resultCvs);
            console.log('Curriculums: ', resultCvs);
        }).catch(error => {
            console.error('Error getting cvs', error);
        });
        setLoading(false);
    }, [auth, setCurriculums]);
    
    return {loading, curriculums};
}