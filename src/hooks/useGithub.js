import {useEffect, useState} from 'react';
import githubService from '../services/github';

export default function useGithub({auth} = {auth: null}) {
    const [loading, setLoading] = useState(true);
    
    useEffect( () => {
        githubService.onBoarding({Authorization: auth})
            .then(resultCvs => {
                setLoading(false);
            }).catch(error => {
                console.error('Error getting cvs', error);
            });
    }, []);
    
    return {loading};
}