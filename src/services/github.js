import axios from 'axios';

const baseUrl = 'http://localhost:5000';

const onBoarding = async (headers) => {
    try {
        // const response = await axios.get(baseUrl+'/api/curriculums', {headers});
        // return response.data;
    } catch (e) {
        console.log('Error with login: ', e);
        throw e;
    }
}

const toExport = {
    onBoarding,
};

export default toExport;