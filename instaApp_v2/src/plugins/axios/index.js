import * as axios from 'axios'
import { AsyncStorage } from 'react-native';


const axiosConfig = ({
  baseURL: 'https://api-dev.historysearch.net',
  headers: {
    'Content-Type': 'application/json'
  },
  data: {}
});

const instance = axios.create(axiosConfig);

axios.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem('at');
    if (token !== null) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (err) => {
  return Promise.reject(err)
});

export { instance as default };
