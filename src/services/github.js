import axios from 'axios';

const baseUrl = process.env.REACT_APP_SERVER_URL;

const getAccessToken = async (headers, data) => {
    try {
        const response = await axios.post(baseUrl+'/api/github/authenticate', data, {headers});
        return JSON.parse(response.data.body);
    } catch (e) {
        console.log('Error getting access token: ', e);
        throw e;
    }
}

const validateAccessToken = async (headers, data) => {
    try {
        const response = await axios.post(baseUrl+'/api/github/validate', data, {headers});
        return response.data;
    } catch (e) {
        throw e;
    }
}

const getUserRepos = async (headers) => {
    try {
        // const response = await axios.get(baseUrl+'/api/curriculums', {headers});
        // return response.data;
    } catch (e) {
        console.log('Error getting user repos: ', e);
        throw e;
    }
}

const toExport = {
    getAccessToken,
    validateAccessToken,
    getUserRepos
};

export default toExport;