import axios from 'axios';

const baseUrl = 'http://localhost:5000/api/login';

const login = async (credentials) => {
    try {
        const response = await axios.post(baseUrl, credentials);
        return response.data;
    } catch (e) {
        console.log('Error with login: ', e);
        throw e;
    }
}

export default {login};