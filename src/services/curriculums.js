import axios from 'axios';

const baseUrl = process.env.REACT_APP_SERVER_URL;

const getUserCurriculums = async (headers) => {
    try {
        const response = await axios.get(baseUrl+'/api/curriculums', {headers});
        return response.data;
    } catch (e) {
        console.log('Error with login: ', e);
        throw e;
    }
}

const postUserCurriculums = async (headers, data) => {
    try {
        const response = await axios.post(baseUrl+'/api/curriculums', data, {headers});
        return response.data;
    } catch(e) {
        console.log('Error creating one curriculum: ', e);
        throw e;
    }
}

const deleteUserCurriculum = async (headers, cv_id) => {
    try {
        const response = await axios.delete(baseUrl+`/api/curriculums/${cv_id}`, {headers});
        return response.data;
    } catch(e) {
        console.log('Error deleting curriculum: ', e);
        throw e;
    }
}

const toExport = {
    getUserCurriculums,
    postUserCurriculums,
    deleteUserCurriculum
};

export default toExport;