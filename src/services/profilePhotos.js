import axios from 'axios';

const baseUrl = process.env.REACT_APP_SERVER_URL;

const getUserProfilePhotos = async (headers) => {
    try {
        const response = await axios.get(baseUrl+'/api/profilePicture', {headers});
        return response.data;
    } catch (e) {
        console.log('Error with getting pictures: ', e);
        throw e;
    }
}

const getOneUserProfilePhoto = async (headers, id) => {
    try {
        const response = await axios.get(baseUrl+`/api/profilePicture/${id}`, {headers});
        return response.data;
    } catch(e) {
        console.log('Error getting picture: ', e);
        throw e;
    }
}

const postUserProfilePhoto = async (headers, data) => {
    try {
        const response = await axios.post(baseUrl+'/api/profilePicture', data, {headers});
        return response.data;
    } catch(e) {
        console.log('Error creating one picture: ', e);
        throw e;
    }
}

const deleteUserProfilePhoto = async (headers, id) => {
    try {
        const response = await axios.delete(baseUrl+`/api/profilePicture/${id}`, {headers});
        return response.data;
    } catch(e) {
        console.log('Error deleting picture: ', e);
        throw e;
    }
}

const toExport = {
    getUserProfilePhotos,
    postUserProfilePhoto,
    deleteUserProfilePhoto,
    getOneUserProfilePhoto
};

export default toExport;