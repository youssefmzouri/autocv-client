import axios from 'axios';

const baseUrl = 'http://localhost:5000';

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

const toExport = {
    getUserCurriculums,
    postUserCurriculums
};

export default toExport;