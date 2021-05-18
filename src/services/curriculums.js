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

const toExport = {
    getUserCurriculums
};

export default toExport;