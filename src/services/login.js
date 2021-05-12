import axios from 'axios';

const baseUrl = 'http://localhost:5000';

const login = async (credentials) => {
    try {
        const response = await axios.post(baseUrl+'/api/login', credentials);
        return response.data;
    } catch (e) {
        console.log('Error with login: ', e);
        throw e;
    }
}

const register = async (credentials) => {
    try {
        await axios.post(baseUrl+'/api/users', credentials);
    } catch (e) {
        console.log('Error with register: ', e);
        throw e;
    }

    try {
        const data = login({
            email: credentials.email,
            password: credentials.password
        });
        return data;
    } catch (e) {
        console.log('Error with login while regiter process: ', e);
        throw e;
    }
}

export default {login, register};