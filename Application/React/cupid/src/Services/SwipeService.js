import config from '../config/hostConfig';
import { instance, nonAuthInstance } from './AxiosInstance';

function createSwipe(createSwipeRequest) {
    console.log('Creating swipe:', createSwipeRequest); 
    return instance.post(`/swipe/create`, createSwipeRequest)
        .then(response => response)
        .catch(error => {
            console.error('Failed to create swipe:', error);
            throw error;
        });
}

function checkMatch(createSwipeRequest) {
    return instance.post(`/swipe/checkMatch`, createSwipeRequest)
        .then(response => response)
        .catch(error => {
            console.error('Failed to check swipe:', error);
            throw error;
        });
}

function deleteSwipe(swipeId) {
    return instance.get(`${config.hostname}/swipe/delete/${swipeId}`)
        .then(response => response)
        .catch(error => {
            console.error('Failed to delete swipe:', error);
            throw error;
        });
}

export default {
    createSwipe,
    checkMatch,
    deleteSwipe,
}