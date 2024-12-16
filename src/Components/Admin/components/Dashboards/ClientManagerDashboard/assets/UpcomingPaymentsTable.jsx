import React, { useState } from "react";

const UpcomingPaymentsTable = ({ clients }) => {
  const [activeTab, setActiveTab] = useState("upcoming");

  const today = new Date();
  const currentDay = today.getDate();

  // Карта месяцев для преобразования из строк в числовые значения
  const monthNameToNumber = {
    Январь: 1,
    Февраль: 2,
    Март: 3,
    Апрель: 4,
    Май: 5,
    Июнь: 6,
    Июль: 7,
    Август: 8,
    Сентябрь: 9,
    Октябрь: 10,
    Ноябрь: 11,
    Декабрь: 12,
  };

  // Фильтрация клиентов с 5 или менее днями до срока оплаты
  const upcomingPayments = clients.filter((client) => {
    if (!client.month || !client.year || !client.day) return false;

    const clientMonth = monthNameToNumber[client.month];
    const clientYear = parseInt(client.year, 10);
    const clientDay = parseInt(client.day, 10);

    return (
      clientYear === today.getFullYear() &&
      clientMonth === today.getMonth() + 1 &&
      clientDay >= currentDay &&
      clientDay - currentDay <= 5
    );
  });

  // Фильтрация неоплаченных клиентов
  const unpaidClients = clients.filter(
    (client) => client.payment === "Не оплачено"
  );

  const renderTable = (filteredClients, title) => {
    if (filteredClients.length === 0) {
      return <p>Нет клиентов для отображения.</p>;
    }

    return (
      <div>
        <h2>{title}</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Имя</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Email
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Телефон
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Статус оплаты
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Дата оплаты
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map((client, idx) => (
              <tr key={idx}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {client.name}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {client.email}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {client.phone}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {client.payment}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {client.day || "Нет данных"}.{client.month || "Нет данных"}.
                  {client.year || "Нет данных"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div>
      <div className="tab-menu">
        <button
          className={`tab-button ${activeTab === "upcoming" ? "active" : ""}`}
          onClick={() => setActiveTab("upcoming")}
        >
          Приближающиеся оплаты
        </button>
        <button
          className={`tab-button ${activeTab === "unpaid" ? "active" : ""}`}
          onClick={() => setActiveTab("unpaid")}
        >
          Неоплаченные
        </button>
      </div>
      {activeTab === "upcoming" &&
        renderTable(upcomingPayments, "Клиенты с приближающимся сроком оплаты")}
      {activeTab === "unpaid" &&
        renderTable(unpaidClients, "Неоплаченные клиенты")}
    </div>
  );
};

export default UpcomingPaymentsTable;
