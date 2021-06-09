import axios from 'axios';

const baseUrl = process.env.REACT_APP_SERVER_URL;

const getUserProjects = async (headers) => {
    try {
        const response = await axios.get(baseUrl+'/api/projects', {headers});
        return response.data || [];
    } catch (e) {
        console.log('Error getting user projects: ', e);
        throw e;
    }
}

const postUserProjects = async (headers, data) => {
    try {
        const response = await axios.post(baseUrl+'/api/projects', data, {headers});
        return response.data;
    } catch(e) {
        console.log('Error creating one project: ', e);
        throw e;
    }
}

const toExport = {
    getUserProjects,
    postUserProjects
};

export default toExport;