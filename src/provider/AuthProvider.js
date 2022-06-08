import { Navigate, Outlet } from "react-router-dom";
import jwt_decode from "jwt-decode";

export const AuthProvider = ({ children }) => {
    const token = localStorage.getItem('token');
    let decoded;

    if (token) {
        decoded = jwt_decode(token);
        if(decoded.exp * 1000 < Date.now()) {
            localStorage.removeItem("token");
            localStorage.removeItem("email");
            localStorage.removeItem("role");
        }
    }

    return token && decoded.exp * 1000 > Date.now() ? <Outlet/> : <Navigate to='login'/>
}