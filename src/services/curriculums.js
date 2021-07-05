import axios from 'axios';
import { saveAs } from 'file-saver';
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

const getUserCurriculum = async (headers, cv_id) => {
    try {
        const response = await axios.get(baseUrl+`/api/curriculums/${cv_id}`, {headers});
        return response.data;
    } catch(e) {
        console.log('Error getting curriculum: ', e);
        throw e;
    }
}

const getUserCurriculumPopulated = async (headers, cv_id) => {
    try {
        const response = await axios.get(baseUrl+`/api/curriculums/${cv_id}/populated`, {headers});
        return response.data;
    } catch(e) {
        console.log('Error getting curriculum: ', e);
        throw e;
    }
}

const exportCurriculumPDF = async (headers, cv) => {
    try {
        const response = await axios.get(baseUrl+`/api/curriculums/${cv.id}/export/pdf`, {headers, responseType: 'blob'});
        const pdfBlob = new Blob([response.data], {type: 'application/pdf'});
        saveAs(pdfBlob, `${cv.name}.pdf`);
    } catch(e) {
        console.log('Error exporting curriculum: ', e);
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

const updateUserCurriculum = async (headers, id, data) => {
    try {
        const response = await axios.put(baseUrl+`/api/curriculums/${id}`, data, {headers});
        return response.data;
    } catch(e) {
        console.log('Error creating one laboral experience: ', e);
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
    getUserCurriculum,
    getUserCurriculumPopulated,
    exportCurriculumPDF,
    postUserCurriculums,
    updateUserCurriculum,
    deleteUserCurriculum
};

export default toExport;