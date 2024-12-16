import React from "react";
import "./style/Sidebar.scss";
import WhatsAppTab from "./Social/WhatsAppTab";

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="sidebar">
      <h2>Меню</h2>
      <ul>
        <li
          className={activeTab === "clients" ? "active" : ""}
          onClick={() => setActiveTab("clients")}
        >
          Клиенты
        </li>
        <li
          className={activeTab === "whatsapp" ? "active" : ""}
          onClick={() => setActiveTab("whatsapp")}
        >
          WhatsApp
        </li>
        <li
          className={activeTab === "telegram" ? "active" : ""}
          onClick={() => setActiveTab("telegram")}
        >
          Telegram
        </li>
        <li
          className={activeTab === "instagram" ? "active" : ""}
          onClick={() => setActiveTab("instagram")}
        >
          Instagram
        </li>
        <li
          className={activeTab === "products" ? "active" : ""}
          onClick={() => setActiveTab("products")}
        >
          Продукты
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
