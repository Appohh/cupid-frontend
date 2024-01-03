import config from '../config/hostConfig';
import { instance, nonAuthInstance } from './AxiosInstance';

function getForYouList(userId) {
    return instance.get(`${config.hostname}/foryou/generateForYou/${userId}`)
        .then(response => response)
        .catch(error => {
            console.error('Failed to retrieve user:', error);
            throw error;
        });
}

export default {
    getForYouList
}