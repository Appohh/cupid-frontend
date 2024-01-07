import config from '../config/hostConfig';
import { instance, nonAuthInstance } from './AxiosInstance';

function createMatch(createMatchRequest) {
    console.log('Creating match:', createMatchRequest); 
    return instance.post(`/match/create`, createMatchRequest)
        .then(response => response)
        .catch(error => {
            console.error('Failed to create match:', error);
            throw error;
        });
}

function getMatchingUsersById(userId) {
    return instance.get(`${config.hostname}/match/${userId}`)
        .then(response => response)
        .catch(error => {
            console.error('Failed to retrieve matches:', error);
            throw error;
        });
}

export default {
    createMatch,
    getMatchingUsersById,
}