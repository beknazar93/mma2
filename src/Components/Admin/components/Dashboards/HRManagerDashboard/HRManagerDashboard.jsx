import React, { useState } from "react";
import Sidebar from "./Sidebar";
import ClientManagerDashboard from "../ClientManagerDashboard/ClientManagerDashboard";
import ProductManagerDashboard from "../ProductManagerDashboard/ProductManagerDashboard";
import "./style/HRManagerDashboard.css";
import WhatsAppTab from "./Social/WhatsAppTab";
import TelegramTab from "./Social/TelegramTab";
import InstagramTab from "./Social/InstagramTab";
const HRManagerDashboard = () => {
  const [activeTab, setActiveTab] = useState("clients");

  return (
    <div className="hr-dashboard">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="content">
        {activeTab === "clients" && <ClientManagerDashboard />}
        {activeTab === "whatsapp" && <WhatsAppTab />}
        {activeTab === "telegram" && <TelegramTab />}
        {activeTab === "instagram" && <InstagramTab />}
        {activeTab === "products" && <ProductManagerDashboard />}
      </div>
    </div>
  );
};

export default HRManagerDashboard;
