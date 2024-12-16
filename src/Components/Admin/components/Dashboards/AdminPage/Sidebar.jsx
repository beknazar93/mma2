import React from "react";

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="sidebar">
      <h2 className="title">Меню</h2>
      <ul>
        <li
          className={activeTab === "analytics" ? "active" : ""}
          onClick={() => setActiveTab("analytics")}
        >
          Аналитика
        </li>
        <li
          className={activeTab === "products" ? "active" : ""}
          onClick={() => setActiveTab("products")}
        >
          Управление товарами
        </li>
        <li
          className={activeTab === "clients" ? "active" : ""}
          onClick={() => setActiveTab("clients")}
        >
          Управление клиентами
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
