import { User } from "@/types/User"
import axios from "../configs/axios"
import { handleAxiosError } from "../helpers/axiosHelper"


export type LoginPayload = {
    email: string,
    password: string
}


const login = async (payload: LoginPayload): Promise<User | null> => {
    try {

        const response = await axios.post('/auth/login', {
            email: payload.email,
            password: payload.password
        })    

        return response.data.user;

    } catch (error) {
        handleAxiosError(error)
        return null
    }
}

//* sử dụng cho saga
const _login = (payload: LoginPayload): Promise<any> => {
    return axios.post('/auth/login', {
        email: payload.email,
        password: payload.password
    })
}

const fetchUser = async (): Promise<User | null> => {
    try {

        const response = await axios.get('/auth/me')
        return response.data.user

    } catch (error) {
        handleAxiosError(error)
        return null
    }
}

const _fetchUser = async (): Promise<null> => {
    return axios.get('/auth/me')
}


const logout = async (): Promise<any> => {
    try {
        const response = await axios.post('/auth/logout');

        console.log('logout response',response)
        return response;
    } catch (error) {
        handleAxiosError(error)
        return null
    }
}


export const authApi = { login, _login, logout, fetchUser, _fetchUser }

