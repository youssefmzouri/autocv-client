import {useEffect, useState} from 'react';
import githubService from '../services/github';

function updateLocalStorageSession(newSession) {
    window.localStorage.removeItem('loggedAutoCvAppUser');
    window.localStorage.setItem (
        'loggedAutoCvAppUser',
        JSON.stringify(newSession)
    );
}

export default function useGithubAccessToken({session, setSession}) {
    const [tokenGithub, setToken] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        const url = window.location.href;
        const hasCode = url.includes("?code=");

        if (hasCode) {
            const newUrl = url.split("?code=");
            window.history.pushState({}, null, newUrl[0]);
      
            const data = {
              code: newUrl[1]
            };
      
            // Use code parameter and other parameters to make POST request to proxy_server
            githubService.getAccessToken({Authorization: session.Authorization}, data)
            .then(({access_token, token_type}) => {
                setToken(`${access_token}`);
                const newSession = {
                    ...session,
                    tokenGithub: `${access_token}`,
                    tokenGithubType: `${token_type}`
                };
                setSession(newSession);
                updateLocalStorageSession(newSession);
            }).catch(error => {
                console.error('Error getting accessToken', error);
            });
        } else {
            if (session.tokenGithub) {
                const data = {
                    tokenGithub: session.tokenGithub
                };
                
                githubService.validateAccessToken({Authorization: session.Authorization}, data)
                .then( (response) => {
                    const {success} = response;
                    if (success) {
                        setToken(session.tokenGithub);
                    } else {
                        setToken('');
                        const newSession = {
                            ...session,
                            tokenGithub: '',
                            tokenGithubType: ''
                        };
                        setSession(newSession);
                        updateLocalStorageSession(newSession);
                    }
                }).catch(error => {
                    console.log('Token validating error: ', error);
                });
            }
        }
        setIsLoading(false);
    }, [session, setSession]);

    return {
        isLoadingToken: isLoading,
        tokenGithub
    }
}


// fetch(proxy_url, {
//   method: "POST",
//   body: JSON.stringify(requestData)
// })
// .then(response => response.json())
// .then(data => {
//     dispatch({
//         type: "LOGIN",
//         payload: { user: data, isLoggedIn: true }
//     });
// })
// .catch(error => {
//     setData({
//         isLoading: false,
//         errorMessage: "Sorry! Login failed"
//     });
// });