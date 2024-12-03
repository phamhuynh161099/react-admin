import { PropsWithChildren, useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from "@/redux/hook"

import { authApi } from '../services/AuthService';


type ProtectedRouteProps = PropsWithChildren

const NoAuthMiddleware = ({ children }: ProtectedRouteProps) => {
    const navigate = useNavigate()
    // const dispatch = useAppDispatch();
    const { isAuthenticated, user } = useAppSelector((state) => state.auth)
    const [checkedAuth, setCheckedAuth] = useState<boolean>(false)

    useEffect(() => {
        const checkAuthenticate = async () => {
            try {
                const userData = await authApi.fetchUser()

                if (userData !== null) {
                    navigate('/admin/user-dashboard');
                } else {
                    setCheckedAuth(true);
                }
            } catch (error) {
                setCheckedAuth(true);
            } finally {

            }
        }
        if (!isAuthenticated || user === null) {
            checkAuthenticate()
        } else {
            navigate('/admin/user-dashboard')
        }

    }, [isAuthenticated, user, navigate])

    return checkedAuth ? children : null
}
export default NoAuthMiddleware