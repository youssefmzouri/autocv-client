import axios from 'axios';

const baseUrl = process.env.REACT_APP_SERVER_URL;

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

const toExport = {
    login,
    register
};

export default toExport;