import axios from 'axios'
import { AsyncStorage } from 'react-native';


const axiosConfig = ({
  baseURL: 'https://api-dev.historysearch.net',
  headers: {
    'Content-Type': 'application/json'
  },
  data: {}
})

const instance = axios.create(axiosConfig)

axios.interceptors.request.use((config) => {
   if(AsyncStorage.getItem('at')) {
      config.headers['Authorization'] = `Bearer ${AsyncStorage.getItem('at')}`
   }
  return config
}, (err) => {
  return Promise.reject(err)
})

// Vue.axios.interceptors.response.use((response) => {
//   return response
// }, (err) => {
//   if (err.config.data === '{}') {
//     store.dispatch('deauthenticateUser')
//     router.replace({ name: 'login' })
//   }
// })

export default instance
