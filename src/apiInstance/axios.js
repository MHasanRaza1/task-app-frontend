import axios from 'axios';

const apiInstance = axios.create({
    baseURL: 'https://task-app-backend-theta.vercel.app/',
    timeout: 3000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiInstance;