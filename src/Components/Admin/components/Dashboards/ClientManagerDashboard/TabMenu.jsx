import React from "react";
import PropTypes from "prop-types";
import "./Style/TabMenu.css"; // Вы можете добавить стили для вкладок

const TabMenu = ({ activeTab, setActiveTab, role }) => {
  const tabs = [
    { key: "clients", label: "Список клиентов" },
    { key: "add", label: "Добавить клиента" },
    { key: "upcoming", label: "Приближающиеся оплаты" },
  ];

  if (["admin", "hr_manager", "client_manager"].includes(role)) {
    tabs.push(
      { key: "delete", label: "Удалить клиента" },
      { key: "edit", label: "Изменить клиента" }
    );
  }

  return (
    <div className="tab-menu">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={`tab-button ${activeTab === tab.key ? "active" : ""}`}
          onClick={() => setActiveTab(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

TabMenu.propTypes = {
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  role: PropTypes.string.isRequired,
};

export default TabMenu;
