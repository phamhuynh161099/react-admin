import { LoginForm } from "@/components/login-form";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { authAction } from "@/redux/slices/authSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading : authLoading,isAuthenticated,} = useAppSelector((state) => state.auth);

  const handleLogin = (username: string, password: string) => {
    try {
      dispatch(authAction.login({ email: username, password }));
    } catch (error) {
      console.log("error", error);
    } finally {
    }
  };

  useEffect(() => {
    if (
      !authLoading
      && isAuthenticated
    ) {
      navigate('/admin/user-dashboard')
    }
  }, [authLoading,isAuthenticated])
 

  return (
    <>
      <div className="flex h-screen w-full items-center justify-center px-4">
        <LoginForm handleLogin={handleLogin} isLoading= {authLoading}/>
      </div>
    </>
  );
};

export default LoginPage;
