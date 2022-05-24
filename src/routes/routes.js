import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import AdminLayout from "../layouts/AdminLayout/AdminLayout";
import AuthLayout from "../layouts/AuthLayout/AuthLayout.js";
import Dashboard from "../pages/Dashboard/Dashboard";
import Login from "../pages/Login/Login";
import ChangePassword from "../pages/ChangePassword/ChangePassword";
import SearchAndAssign from "../pages/SearchAndAssign/SearchAndAssign";
import FunctionAndRequirements from "../pages/FunctionAndRequirements/FunctionAndRequirements";
import AssignmentManagement from "../pages/AssignmentManagement/AssignmentManagement";
import Users from "../pages/Users/Users";
import SavedFilters from "../pages/SavedFilters/SavedFilters";
import Reports from "../pages/Reports";

const AppRoutes = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
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

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/change-password" element={<ChangePassword />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
