import axios from 'axios';

const baseUrl = process.env.REACT_APP_SERVER_URL;

const getUserAcademicExp = async (headers) => {
    try {
        const response = await axios.get(baseUrl+'/api/academicexperiences', {headers});
        return response.data;
    } catch (e) {
        console.log('Error with getting academic experiences: ', e);
        throw e;
    }
}

const getOneUserAcademicExp = async (headers, id) => {
    try {
        const response = await axios.get(baseUrl+`/api/academicexperiences/${id}`, {headers});
        return response.data;
    } catch(e) {
        console.log('Error deleting curriculum: ', e);
        throw e;
    }
}

const postUserAcademicExp = async (headers, data) => {
    try {
        const response = await axios.post(baseUrl+'/api/academicexperiences', data, {headers});
        return response.data;
    } catch(e) {
        console.log('Error creating one academic experience: ', e);
        throw e;
    }
}

const updateUserAcademicExp = async (headers, id, data) => {
    try {
        const response = await axios.put(baseUrl+`/api/academicexperiences/${id}`, data, {headers});
        return response.data;
    } catch(e) {
        console.log('Error creating one academic experience: ', e);
        throw e;
    }
}

const deleteUserAcademicExp = async (headers, id) => {
    try {
        const response = await axios.delete(baseUrl+`/api/academicexperiences/${id}`, {headers});
        return response.data;
    } catch(e) {
        console.log('Error deleting curriculum: ', e);
        throw e;
    }
}

const toExport = {
    getUserAcademicExp,
    postUserAcademicExp,
    deleteUserAcademicExp,
    getOneUserAcademicExp,
    updateUserAcademicExp
};

export default toExport;