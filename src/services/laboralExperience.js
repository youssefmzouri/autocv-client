import axios from 'axios';

const baseUrl = process.env.REACT_APP_SERVER_URL;

const getUserLaboralExp = async (headers) => {
    try {
        const response = await axios.get(baseUrl+'/api/laboralexperiences', {headers});
        return response.data;
    } catch (e) {
        console.log('Error with login: ', e);
        throw e;
    }
}

const postUserLaboralExp = async (headers, data) => {
    try {
        const response = await axios.post(baseUrl+'/api/laboralexperiences', data, {headers});
        return response.data;
    } catch(e) {
        console.log('Error creating one laboral experience: ', e);
        throw e;
    }
}

const deleteUserLaboralExp = async (headers, id) => {
    try {
        const response = await axios.delete(baseUrl+`/api/laboralexperiences/${id}`, {headers});
        return response.data;
    } catch(e) {
        console.log('Error deleting curriculum: ', e);
        throw e;
    }
}

const toExport = {
    getUserLaboralExp,
    postUserLaboralExp,
    deleteUserLaboralExp
};

export default toExport;