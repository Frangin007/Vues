import axios from 'axios';
import store from '../store/index.js';

export default() => {
    const axiosInstance = axios.create({ 
        baseURL : `${process.env.VUE_APP_URL}`
    })

    const token = sessionStorage.getItem('token')
    if (token) {
        
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
    axiosInstance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response.status === 401) {
                store.dispatch('signOut')
                //route.push({ name : 'login' })
                window.location.href = process.env.VUE_APP_REDIRECT;
            }
            return Promise.reject(error)
        }
    )
    return axiosInstance
}