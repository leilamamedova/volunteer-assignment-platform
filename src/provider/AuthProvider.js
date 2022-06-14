import { Navigate, Outlet, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";
import useStore from "../services/store";

export const AuthProvider = ({ children }) => {
    const token = localStorage.getItem('token');
    const setSystemRole = useStore(({ setSystemRole }) => setSystemRole);
    const setUserEmail = useStore(({ setUserEmail }) => setUserEmail);
    let decoded;

    if (token) {
        decoded = jwt_decode(token);
        typeof decoded.roles === 'string' ? setSystemRole([decoded.roles]) : setSystemRole(decoded.roles);
        setUserEmail(decoded.email);
        if(decoded.exp * 1000 < Date.now()) {
            localStorage.removeItem("token");
            setSystemRole('');
            setUserEmail('');
        }
    }

    return token && decoded.exp * 1000 > Date.now() ? <Outlet/> : <Navigate to='login'/>
}