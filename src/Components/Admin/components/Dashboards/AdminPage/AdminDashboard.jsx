import React, { useState } from "react";
import Sidebar from "./Sidebar";
import AdminAnalytics from "./AdminAnalytics";
import ProductManagement from "./ProductManagement";
import ClientManagement from "./ClientManagement";
import "./adminStyles.scss"; // Импортируем SCSS файл

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("analytics"); // Текущий активный раздел

  return (
    <div className="dashboard-container-admin">
      {/* Сайдбар */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Контент */}
      <div className="content">
        <h1>Административная панель</h1>

        {activeTab === "analytics" && <AdminAnalytics />}
        {activeTab === "products" && <ProductManagement />}
        {activeTab === "clients" && <ClientManagement />}
      </div>
    </div>
  );
};

export default AdminDashboard;
