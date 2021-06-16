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

const getUserProject = async (headers, project_id) => {
    try {
        const response = await axios.get(baseUrl+`/api/projects/${project_id}`, {headers});
        return response.data;
    } catch(e) {
        console.log('Error getting project: ', e);
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

const updateUserProject = async (headers, project) => {
    try {
        const response = await axios.put(baseUrl+`/api/projects/${project.id}`, project, {headers});
        return response.data;
    } catch(e) {
        console.log('Error creating one project: ', e);
        throw e;
    }
}

const deleteUserProject = async (headers, project_id) => {
    try {
        const response = await axios.delete(baseUrl+`/api/projects/${project_id}`, {headers});
        return response.data;
    } catch(e) {
        console.log('Error deleting project: ', e);
        throw e;
    }
}

const toExport = {
    getUserProjects,
    getUserProject,
    postUserProjects,
    deleteUserProjects: deleteUserProject,
    updateUserProject
};

export default toExport;