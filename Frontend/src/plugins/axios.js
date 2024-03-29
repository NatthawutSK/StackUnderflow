import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:3000',
})

instance.interceptors.request.use(
    function (config) {
        const token = document.cookie.split(';')[0].split('=')[1]
        // console.log(token);
        // console.log(token);
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default instance
