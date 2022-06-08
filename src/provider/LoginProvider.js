import { Navigate, Outlet } from "react-router-dom";
import jwt_decode from "jwt-decode";

export const LoginProvider = ({ children }) => {
    const token = localStorage.getItem('token');
    let decoded;

    if (token) {
        decoded = jwt_decode(token);
    }

    return token && decoded.exp * 1000 > Date.now() ? <Navigate to='/'/> : <Outlet/>
}