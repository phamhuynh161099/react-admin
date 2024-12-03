import { PropsWithChildren, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { authAction} from "@/redux/slices/authSlice"

import {authApi} from '../services/AuthService';


type ProtectedRouteProps = PropsWithChildren

const AdminAuthMiddleware = ({children} : ProtectedRouteProps) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const { isAuthenticated, user } = useAppSelector((state) => state.auth)
    
    useEffect(() => {
        const checkAuthenticate = async () => {
            if(!isAuthenticated || user === null){ 
                const userData = await authApi.fetchUser()
                if(userData){
                    dispatch(authAction.setAuth(userData))
                }else{
                    dispatch(authAction.setLogout())
                    navigate('/admin/login')
                }
            }
        }
        checkAuthenticate()
    
    }, [isAuthenticated, user, dispatch, navigate])
    return isAuthenticated && user ? children : null
}
export default AdminAuthMiddleware