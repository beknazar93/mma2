import React, { useState, useMemo } from "react";
import Filters from "./assets/Filters";
import "./Style/DeleteClients.css";

function DeleteClients({ clients, onDeleteClient, filters, setFilters }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTrainer, setSelectedTrainer] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedSport, setSelectedSport] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedClients, setSelectedClients] = useState([]);

  const filteredClients = useMemo(() => {
    let filtered = clients;

    if (searchTerm) {
      filtered = filtered.filter(
        (client) =>
          client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedTrainer) {
      filtered = filtered.filter(
        (client) => client.trainer === selectedTrainer
      );
    }
    if (selectedSport) {
      filtered = filtered.filter(
        (client) => client.sport_category === selectedSport
      );
    }
    if (selectedMonth) {
      filtered = filtered.filter((client) => client.month === selectedMonth);
    }
    if (selectedDay) {
      filtered = filtered.filter((client) => client.day === selectedDay);
    }
    if (selectedYear) {
      filtered = filtered.filter(
        (client) => String(client.year).trim() === String(selectedYear).trim()
      );
    }
    return filtered;
  }, [
    searchTerm,
    selectedTrainer,
    selectedSport,
    selectedMonth,
    selectedDay,
    selectedYear,
    clients,
  ]);

  const toggleClientSelection = (clientId) => {
    setSelectedClients((prevSelected) =>
      prevSelected.includes(clientId)
        ? prevSelected.filter((id) => id !== clientId)
        : [...prevSelected, clientId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedClients.length === filteredClients.length) {
      setSelectedClients([]);
    } else {
      setSelectedClients(filteredClients.map((client) => client.id));
    }
  };

  return (
    <div className="delete-clients">
      <h3>Удаление клиентов</h3>
      <Filters filters={filters} setFilters={setFilters} clients={clients} />
      <div className="actions">
        <button onClick={toggleSelectAll} className="delete-button">
          {selectedClients.length === filteredClients.length
            ? "Снять выделение"
            : "Выбрать всех"}
        </button>
        <button
          onClick={() => {
            selectedClients.forEach((clientId) => onDeleteClient(clientId));
            setSelectedClients([]);
          }}
          className="delete-button"
        >
          Удалить выбранных
        </button>
      </div>
      {filteredClients.length === 0 ? (
        <p>Нет данных для отображения.</p>
      ) : (
        <table className="clients-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectedClients.length === filteredClients.length}
                  onChange={toggleSelectAll}
                />
              </th>
              <th>Имя</th>
              <th>Email</th>
              <th>Телефон</th>
              <th>Тренер</th>
              <th>Категория спорта</th>
              <th>Год</th>
              <th>Месяц</th>
              <th>День</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map((client) => (
              <tr key={client.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedClients.includes(client.id)}
                    onChange={() => toggleClientSelection(client.id)}
                  />
                </td>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.phone}</td>
                <td>{client.trainer || "Не указан"}</td>
                <td>{client.sport_category || "Не указана"}</td>
                <td>{client.year || "Не указан"}</td>
                <td>{client.month || "Не указан"}</td>
                <td>{client.day || "Не указан"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default DeleteClients;
