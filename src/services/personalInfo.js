import axios from 'axios';

const baseUrl = process.env.REACT_APP_SERVER_URL;

const getUserPersonalInfo = async (headers) => {
    try {
        const response = await axios.get(baseUrl+'/api/userprofile', {headers});
        return response.data;
    } catch (e) {
        console.log('Error with getting personal info: ', e);
        throw e;
    }
}

const getOneUserPersonalInfo = async (headers, id) => {
    try {
        const response = await axios.get(baseUrl+`/api/userprofile/${id}`, {headers});
        return response.data;
    } catch(e) {
        console.log('Error getting personal info: ', e);
        throw e;
    }
}

const postUserPersonalInfo = async (headers, data) => {
    try {
        const response = await axios.post(baseUrl+'/api/userprofile', data, {headers});
        return response.data;
    } catch(e) {
        console.log('Error creating one personal info: ', e);
        throw e;
    }
}

const updateUserPersonalInfo = async (headers, id, data) => {
    try {
        const response = await axios.put(baseUrl+`/api/userprofile/${id}`, data, {headers});
        return response.data;
    } catch(e) {
        console.log('Error creating one personal info: ', e);
        throw e;
    }
}

const deleteUserPersonalInfo = async (headers, id) => {
    try {
        const response = await axios.delete(baseUrl+`/api/userprofile/${id}`, {headers});
        return response.data;
    } catch(e) {
        console.log('Error deleting personal info: ', e);
        throw e;
    }
}

const toExport = {
    getUserPersonalInfo,
    postUserPersonalInfo,
    deleteUserPersonalInfo,
    getOneUserPersonalInfo,
    updateUserPersonalInfo
};

export default toExport;