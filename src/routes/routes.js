import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import AdminLayout from '../layouts/AdminLayout/AdminLayout';
import AuthLayout from "../layouts/AuthLayout/AuthLayout.js";
import Dashboard from "../pages/Dashboard/Dashboard";
import Login from "../pages/Login/Login";
import SearchAndAssign from "../pages/Test/SearchAndAssign";

const AppRoutes = () => {
    return (
        <Router>
            <ScrollToTop/>
                <Routes>     
                    <Route element={<AdminLayout/>}>
                        <Route path='/' element={<Dashboard/>}/>
                        <Route path='/search-and-assign' element={<SearchAndAssign/>}/>
                    </Route>   

                    <Route element={<AuthLayout/>}>
                        <Route path='/login' element={<Login/>}/>
                    </Route>                   
                </Routes>
        </Router>
    )
}

export default AppRoutes;