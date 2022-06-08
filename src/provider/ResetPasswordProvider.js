import { Navigate, Outlet } from "react-router-dom";

export const ResetPasswordProvider = ({ children }) => {
    const queryParams = new URLSearchParams(window.location.search);

    return queryParams.get("token") && queryParams.get("email") ? <Outlet/> : <Navigate to='login'/>
}