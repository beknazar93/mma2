import React, { useState, useMemo } from "react";
import Filters from "./assets/Filters";
import "./Style/EditClientForm.css";

function EditClientForm({ clients, onEditClient, filters, setFilters }) {
  const [formData, setFormData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTrainer, setSelectedTrainer] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedSport, setSelectedSport] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [editingClient, setEditingClient] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

  const openEditModal = (client) => {
    setEditingClient(client);
    setFormData(client);
    setShowModal(true);
  };

  const closeEditModal = () => {
    setEditingClient(null);
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingClient) {
      onEditClient(editingClient.id, formData);
      closeEditModal();
    }
  };

  return (
    <div className="edit-client-form">
      <h3>Изменение данных клиентов</h3>
      <Filters
        clients={filteredClients}
        filters={filters}
        setFilters={setFilters}
      />
      {filteredClients.length === 0 ? (
        <p>Нет данных для отображения.</p>
      ) : (
        <div className="table-container">
          <table className="client-table">
            <thead>
              <tr>
                <th>Имя</th>
                <th>Email</th>
                <th>Телефон</th>
                <th>Тренер</th>
                <th>Категория спорта</th>
                <th>Статус</th>
                <th>День</th>
                <th>Месяц</th>
                <th>Год</th>
                <th>Сумма оплаты</th>
                <th>Комментарий</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr key={client.id}>
                  <td>{client.name}</td>
                  <td>{client.email}</td>
                  <td>{client.phone}</td>
                  <td>{client.trainer || "Не указан"}</td>
                  <td>{client.sport_category || "Не указано"}</td>
                  <td>{client.payment || "Не указан"}</td>
                  <td className="day">{client.day || "Не указан"}</td>
                  <td>{client.month || "Не указан"}</td>
                  <td>{client.year || "Не указан"}</td>
                  <td>{client.price}сом</td>
                  <td>{client.comment || "Нет комментария"}</td>

                  <td>
                    <button
                      className="edit-button"
                      onClick={() => openEditModal(client)}
                    >
                      Изменить
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay-top">
          <div className="modal-content-top">
            <h3>Редактирование клиента</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Имя"
                value={formData.name || ""}
                onChange={handleInputChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email || ""}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="phone"
                placeholder="Телефон"
                value={formData.phone || ""}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="trainer"
                placeholder="Тренер"
                value={formData.trainer || ""}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="sport_category"
                placeholder="Категория спорта"
                value={formData.sport_category || ""}
                onChange={handleInputChange}
              />
              <select
                name="payment"
                value={formData.payment || ""}
                onChange={handleInputChange}
              >
                <option value="">Выберите статус</option>
                <option value="Оплачено">Оплачено</option>
                <option value="Не оплачено">Не оплачено</option>
              </select>
              <input
                type="text"
                name="day"
                placeholder="День"
                value={formData.day || ""}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="month"
                placeholder="Месяц"
                value={formData.month || ""}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="year"
                placeholder="Год"
                value={formData.year || ""}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="price"
                placeholder="Сумма оплаты"
                value={formData.price || ""}
                onChange={handleInputChange}
              />
              <textarea
                name="comment"
                placeholder="Комментарий"
                value={formData.comment || ""}
                onChange={handleInputChange}
              />
              <button type="submit" className="save-button">
                Сохранить
              </button>
              <button
                type="button"
                className="cancel-button"
                onClick={closeEditModal}
              >
                Отмена
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditClientForm;
