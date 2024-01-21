import config from '../config/hostConfig';
import { instance, nonAuthInstance } from './AxiosInstance';

function getAnalytics() {
    return instance.get(`${config.hostname}/analytics/generateDashboard`)
        .then(response => response)
        .catch(error => {
            console.error('Failed to retrieve analytics:', error);
            throw error;
        });
}

export default {
    getAnalytics
}