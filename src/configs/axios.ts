import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

// export const baseUrl = 'http://103.155.161.244:8000/api/v1/'
// export const baseUrl = 'http://127.0.0.1:8000/api/v1/'

//! public my ip
// export const baseUrl = 'http://10.20.13.50:8000/api/v1/'

//! url vps
export const baseUrl = 'https://villa.pham-huynh.io.vn/api/v1/'

const apiCall: AxiosInstance = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})

const refreshToken = async () => {
    try {
        const response = await apiCall.post('auth/refresh')
        
    } catch (error) {
        throw new Error('Không thể khởi tạo lại access token')
    }
}

axios.interceptors.response.use(
    response => {
        return response
    },
    async (error) => {

        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
        if(error.response?.status === 401 && !originalRequest._retry){
            originalRequest._retry = true
            try {
                const userData = await refreshToken()
                return apiCall(originalRequest)

            } catch (error) {
                return Promise.reject(error)
           }
        }
        return Promise.reject(error)
    }
)

axios.defaults.withCredentials = true
axios.defaults.baseURL = baseUrl
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

export default axios

