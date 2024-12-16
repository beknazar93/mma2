import React, { useState } from "react";
import "./ClientsTable.css"; // Подключаем CSS стили

const ClientsTable = ({ clients, onExtendClient }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [comment, setComment] = useState("");
  const [notification, setNotification] = useState(null); // Для уведомлений

  const openModal = (client) => {
    setSelectedClient(client);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedClient(null);
    setComment("");
    setIsModalOpen(false);
  };

  const handleExtend = () => {
    if (!selectedClient || !onExtendClient) return;

    const nextMonth = getNextMonth(selectedClient.month);
    const nextYear = getNextYear(selectedClient.month, selectedClient.year);

    // Проверка, чтобы клиента нельзя было продлить дважды на один и тот же месяц
    if (
      clients.some(
        (client) =>
          client.id === selectedClient.id &&
          client.month === nextMonth &&
          client.year === nextYear.toString()
      )
    ) {
      setNotification({
        type: "error",
        message: "Этот клиент уже продлен на следующий месяц.",
      });
      return;
    }

    try {
      // Продление клиента
      onExtendClient(selectedClient.id, {
        month: nextMonth,
        year: nextYear,
        comment: comment || selectedClient.comment,
      });

      setNotification({
        type: "success",
        message: "Клиент успешно продлен.",
      });
      closeModal();
    } catch (error) {
      setNotification({
        type: "error",
        message: "Произошла ошибка при продлении клиента.",
      });
    }
  };

  const getNextMonth = (currentMonth) => {
    const months = [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ];
    const index = months.indexOf(currentMonth);
    return index === -1 ? "Январь" : months[(index + 1) % 12];
  };

  const getNextYear = (currentMonth, currentYear) => {
    return currentMonth === "Декабрь" ? parseInt(currentYear) + 1 : currentYear;
  };

  return (
    <div className="table-container">
      <table className="clients-table">
        <thead>
          <tr>
            <th>Имя</th>
            <th>Email</th>
            <th>Телефон</th>
            <th>Тренер</th>
            <th>Вид спорта</th>
            <th>Месяц</th>
            <th>Год</th>
            <th>Комментарий</th>
            <th>Статус оплаты</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td>{client.name}</td>
              <td>{client.email}</td>
              <td>{client.phone}</td>
              <td>{client.trainer || "Не указан"}</td>
              <td>{client.sport_category || "Не указано"}</td>
              <td>{client.month || "Не указан"}</td>
              <td>{client.year || "Не указан"}</td>
              <td>{client.comment || "Нет комментария"}</td>
              <td className={`payment-status ${client.payment}`}>
                {client.payment}
              </td>
              <td>
                <button
                  className="extend-button"
                  onClick={() => openModal(client)}
                >
                  Продлить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Продление клиента</h3>
            <p>
              Клиент: <strong>{selectedClient?.name}</strong>
            </p>
            <textarea
              placeholder="Введите комментарий"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <button className="save-button" onClick={handleExtend}>
              Сохранить
            </button>
            <button className="cancel-button" onClick={closeModal}>
              Отмена
            </button>
          </div>
        </div>
      )}

      {notification && (
        <div className={`notification ${notification.type}`}>
          <p>{notification.message}</p>
          <button onClick={() => setNotification(null)}>Закрыть</button>
        </div>
      )}
    </div>
  );
};

export default ClientsTable;
