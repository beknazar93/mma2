import React from "react";
import PropTypes from "prop-types";
import "./Style/DashboardHeader.css";

const DashboardHeader = ({ title, error, onLogout }) => (
  <div className="dashboard-header">
    <div className="header-content">
      <h1>{title}</h1>
      <button className="logout-button" onClick={onLogout}>
        Выйти
      </button>
    </div>
    {error && <div className="error-notification">{error}</div>}
  </div>
);

DashboardHeader.propTypes = {
  title: PropTypes.string.isRequired,
  error: PropTypes.string,
  onLogout: PropTypes.func.isRequired,
};

export default DashboardHeader;
