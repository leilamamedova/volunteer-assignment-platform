import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import AdminLayout from "../layouts/AdminLayout/AdminLayout";
import AuthLayout from "../layouts/AuthLayout/AuthLayout.js";
import Dashboard from "../pages/Dashboard/Dashboard";
import Login from "../pages/Login/Login";
import NotFound from "../pages/NotFound/NotFound";
import ChangePassword from "../pages/ChangePassword/ChangePassword";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import SearchAndAssign from "../pages/SearchAndAssign/SearchAndAssign";
import FunctionAndRequirements from "../pages/FunctionAndRequirements/FunctionAndRequirements";
import AssignmentManagement from "../pages/AssignmentManagement/AssignmentManagement";
import Users from "../pages/Users/Users";
import SavedFilters from "../pages/SavedFilters/SavedFilters";
import Reports from "../pages/Reports";
import { AuthProvider } from '../provider/AuthProvider';
import { ResetPasswordProvider } from '../provider/ResetPasswordProvider';
import { LoginProvider } from '../provider/LoginProvider';

const AppRoutes = () => {
  return (
    <Router>
      <ScrollToTop />      
        <Routes>
          <Route element={<AuthProvider />}>
            <Route element={<AdminLayout />}>
              <Route path="/" element={<Dashboard />} exact />
              <Route path="/savedfilters" element={<SavedFilters />} />
              <Route path="/search-and-assign" element={<SearchAndAssign />} />
              <Route
                path="/function-and-requirements"
                element={<FunctionAndRequirements />}
              />
              <Route path="/reports" element={<Reports />} />
              {/* <Route
                path="/assignment-management"
                element={<AssignmentManagement />}
              />
              <Route path="/users" element={<Users />} /> */}
            </Route>
          </Route>

        <Route element={<AuthLayout />}>
          <Route element={<AuthProvider />}>
            <Route path="/change-password" element={<ChangePassword />} />            
          </Route>
          <Route element={<LoginProvider/>}>
            <Route path="/login" element={<Login />} />          
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>
          <Route element={<ResetPasswordProvider/>}>
            <Route path={`/auth/Users/resetPassword`} element={<ResetPassword />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
