import {useEffect, useState} from 'react';
import cvService from '../services/curriculums';

export default function useCurriculums({auth} = {auth: null}) {
    const [curriculums, setCurriculums] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect( () => {
        cvService.getUserCurriculums({Authorization: auth})
            .then(resultCvs => {
                setCurriculums(resultCvs);
                setLoading(false);
                console.log('Curriculums: ', resultCvs);
            }).catch(error => {
                console.error('Error getting cvs', error);
            });
    }, [auth, setCurriculums]);
    
    return {loading, curriculums};
}