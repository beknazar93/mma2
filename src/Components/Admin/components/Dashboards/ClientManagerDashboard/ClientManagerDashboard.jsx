import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchClientsData,
  refreshAccessToken,
  updateClientData,
} from "./utils/api";
import { filterClients } from "./utils/utils";
import DashboardHeader from "./DashboardHeader";
import TabMenu from "./TabMenu";
import ClientsTable from "./assets/ClientsTable";
import Filters from "./assets/Filters";
import AddClientForm from "./assets/AddClientForm";
import UpcomingPaymentsTable from "./assets/UpcomingPaymentsTable";
import DeleteClients from "./DeleteClients";
import EditClientForm from "./EditClientForm";
import "./Style/ClientManagerDashboard.css";

function ClientManagerDashboard() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [activeTab, setActiveTab] = useState("clients");

  const [filters, setFilters] = useState({
    searchTerm: "",
    selectedTrainer: "",
    selectedMonth: "",
    selectedDay: "",
    selectedSport: "",
    selectedYear: "",
  });

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const { clientsData, profileData } = await fetchClientsData();
      setClients(clientsData);
      setUserName(profileData.username || "Неизвестный пользователь");
      setUserRole(profileData.role || "");
    } catch (err) {
      if (err.response?.status === 401) {
        const newToken = await refreshAccessToken(navigate);
        if (newToken) fetchData();
      } else {
        setError("Ошибка загрузки данных");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateClient = async (clientId, updatedData) => {
    const updatedClient = await updateClientData(clientId, updatedData);
    if (updatedClient) {
      setClients((prevClients) =>
        prevClients.map((client) =>
          client.id === clientId ? { ...client, ...updatedData } : client
        )
      );
    }
  };

  const filteredClients = useMemo(
    () => filterClients(clients, filters),
    [clients, filters]
  );

  if (loading) {
    return <DashboardHeader title="Загрузка данных..." />;
  }
  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    window.location.href = "/admin"; // Перенаправление на страницу входа
  };
  return (
    <div className="dashboard">
      <DashboardHeader
        title={`Добро пожаловать, ${userName}!`}
        error={error}
        onLogout={handleLogout}
      />
      <Filters filters={filters} setFilters={setFilters} clients={clients} />
      <TabMenu
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        role={userRole}
      />
      {activeTab === "clients" && <ClientsTable clients={filteredClients} />}
      {activeTab === "add" && (
        <AddClientForm
          onClientAdded={(newClient) => setClients([...clients, newClient])}
        />
      )}
      {activeTab === "delete" && (
        <DeleteClients
          clients={filteredClients}
          filters={filters}
          setFilters={setFilters}
          onDeleteClient={(clientId) =>
            setClients((prev) =>
              prev.filter((client) => client.id !== clientId)
            )
          }
        />
      )}
      {activeTab === "edit" && (
        <EditClientForm
          filters={filters}
          setFilters={setFilters}
          clients={filteredClients}
          onEditClient={handleUpdateClient}
        />
      )}
      {activeTab === "upcoming" && (
        <UpcomingPaymentsTable clients={filteredClients} />
      )}
    </div>
  );
}

export default ClientManagerDashboard;
