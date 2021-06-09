import {useEffect, useState} from 'react';
import githubService from '../services/github';

export default function useGithubRepositories({session}) {
    const [githubRepos, setGithubRepos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const data = {
            tokenGithub: session.tokenGithub
        };
        githubService.getUserRepos({Authorization: session.Authorization}, data)
        .then((result) => {
            setGithubRepos(JSON.parse(result));
            setIsLoading(false);
        }).catch(error => {
            console.error('Error getting repos ... ', error);
            setIsLoading(false);
        });
    }, [session]);


    return {
        isLoading,
        githubRepos
    }
}