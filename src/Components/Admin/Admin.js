import React from "react";
import Login from "./components/Auth/Login";
import './styles/Admin.css'
import { Route, Routes } from "react-router-dom";
import Register from "./components/Auth/Register";
import AdminDashboard from "./components/Dashboards/AdminPage/AdminDashboard";
import ClientManagerDashboard from './components/Dashboards/ClientManagerDashboard/ClientManagerDashboard'
import ProductManagerDashboard from './components/Dashboards/ProductManagerDashboard/ProductManagerDashboard'
import HRManagerDashboard from './components/Dashboards/HRManagerDashboard/HRManagerDashboard'
import EmployeeDashboard from'./components/Dashboards/EmployeeDashboard/EmployeeDashboard'

function Admin() {
  return (
    <div className="App">
     
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/register'  element={<Register/>}/>
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/client-managerDashboard" element={<ClientManagerDashboard/> } />
        <Route path="/product-managerDashboard" element={<ProductManagerDashboard />} />
        <Route path="/hr-managerDashboard" element={<HRManagerDashboard />} />
        <Route path="/employeeDashboard" element={<EmployeeDashboard />} />
      </Routes>
     
    </div>
  );
}

export default Admin;
