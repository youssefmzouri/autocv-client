import {useEffect, useState} from 'react';
import laboralExpService from '../services/laboralExperience';

export default function useLaboralExperience({auth} = {auth: null}) {
    const [laboralExp, setLaboralExp] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect( () => {
        laboralExpService.getUserLaboralExp({Authorization: auth})
        .then(result => {
            setLaboralExp(result);
            console.log('Laboral Experience: ', result);
        }).catch(error => {
            console.error('Error getting laboral exp', error);
        });
        setLoading(false);
    }, [auth, setLaboralExp]);
    
    return {loading, laboralExp};
}