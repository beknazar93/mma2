import React, { useState, useEffect } from "react";

const ClientManagement = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchClients = async () => {
    const token = localStorage.getItem("access_token"); // Получаем токен из localStorage
    if (!token) {
      console.error("Нет токена авторизации. Выполните вход.");
      return;
    }

    try {
      const response = await fetch(
        "https://testosh.pythonanywhere.com/api/clients/",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Добавляем заголовок авторизации
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setClients(data);
      } else if (response.status === 401) {
        console.error("Ошибка загрузки данных: Unauthorized");
        // Перенаправление на страницу входа
        window.location.href = "/login";
      } else {
        console.error("Ошибка загрузки данных:", response.statusText);
      }
    } catch (error) {
      console.error("Ошибка при загрузке клиентов:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      console.error("Нет токена авторизации. Выполните вход.");
      return;
    }

    try {
      const response = await fetch(
        `https://testosh.pythonanywhere.com/api/clients/${id}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`, // Добавляем заголовок авторизации
          },
        }
      );

      if (response.ok) {
        setClients((prevClients) =>
          prevClients.filter((client) => client.id !== id)
        );
      } else {
        console.error("Ошибка при удалении клиента:", await response.text());
      }
    } catch (error) {
      console.error("Ошибка при удалении клиента:", error);
    }
  };

  const handleEdit = async (id) => {
    const updatedName = prompt("Введите новое имя");
    if (!updatedName) return;

    const token = localStorage.getItem("access_token");
    if (!token) {
      console.error("Нет токена авторизации. Выполните вход.");
      return;
    }

    try {
      const response = await fetch(
        `https://testosh.pythonanywhere.com/api/clients/${id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Добавляем заголовок авторизации
          },
          body: JSON.stringify({ name: updatedName }),
        }
      );

      if (response.ok) {
        const updatedData = await response.json();
        setClients((prevClients) =>
          prevClients.map((client) =>
            client.id === id ? { ...client, name: updatedData.name } : client
          )
        );
      } else {
        console.error("Ошибка при изменении клиента:", await response.text());
      }
    } catch (error) {
      console.error("Ошибка при изменении клиента:", error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  if (loading) {
    return <p>Загрузка данных...</p>;
  }

  return (
    <div>
      <h2>Управление клиентами</h2>
      <table border={1} style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>№</th>
            <th>Имя</th>
            <th>Телефон</th>
            <th>Email</th>
            <th>Тренер</th>
            <th>Оплата</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {clients.length > 0 ? (
            clients.map((client, idx) => (
              <tr key={client.id}>
                <td>{idx + 1}</td>
                <td>{client.name || "Нет имени"}</td>
                <td>{client.phone || "Нет данных"}</td>
                <td>{client.email || "Нет данных"}</td>
                <td>{client.trainer || "Нет тренера"}</td>
                <td>{client.payment || "Нет данных"}</td>
                <td>
                  <button
                    style={{
                      marginRight: "10px",
                      padding: "5px 10px",
                      backgroundColor: "blue",
                      color: "white",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onClick={() => handleEdit(client.id)}
                  >
                    Изменить
                  </button>
                  <button
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onClick={() => handleDelete(client.id)}
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                Нет клиентов для отображения
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ClientManagement;
