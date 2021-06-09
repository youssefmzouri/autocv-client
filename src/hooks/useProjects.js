import {useEffect, useState} from 'react';
import projectsService from '../services/projects';

export default function useProjects({auth} = {auth: null}) {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect( () => {
        projectsService.getUserProjects({Authorization: auth})
        .then(result => {
            setProjects(result);
            console.log('Projects: ', result);
        }).catch(error => {
            console.error('Error getting projects', error);
        });
        setLoading(false);
    }, [auth, setProjects]);
    
    return {loading, projects};
}