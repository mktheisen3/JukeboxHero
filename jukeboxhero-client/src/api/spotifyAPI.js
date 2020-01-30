import axios from 'axios';
import { AsyncStorage } from 'react-native';

const instance = axios.create({
    baseURL: 'https://api.spotify.com/v1'
});

instance.interceptors.request.use(
    async config => {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (accessToken) {
            // console.log(accessToken);
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

export default instance;