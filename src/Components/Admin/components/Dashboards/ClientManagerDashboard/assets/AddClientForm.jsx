import React, { useState, useEffect } from "react";

const AddClientForm = ({ onClientAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    stage: "",
    trainer: "",
    sport_category: "",
    year: "",
    month: "",
    day: "",
    comment: "",
    payment: "",
    price: "",
  });
  const [clients, setClients] = useState([]); // Список существующих клиентов
  const [message, setMessage] = useState({ type: "", text: "" });

  const getManagerName = () =>
    localStorage.getItem("manager_name") || "Unknown Manager";

  const getCurrentUserToken = () => localStorage.getItem("access");

  const years = Array.from(
    { length: 3 },
    (_, idx) => new Date().getFullYear() + idx
  );
  const trainers = [
    "Калмамат уулу Акай",
    "Мойдунов Мирлан",
    "Сатаров Канат",
    "Тургунов Испам",
    "Абдуманап уулу Илим",
    "Машрапов Тилек",
    "Лукас Крабб",
    "Асанбоев Эрлан",
    "Онарбаев Аскол",
    "Азизбек уулу Бааман",
    "Минбаев Сулейман",
    "Медербек уулу Саформурат",
  ];
  const sports = [
    "ММА",
    "Бокс",
    "Борьба",
    "Тейкхвандо",
    "Самбо",
    "Греко-римская борьба",
    "Кросс Фит",
    "Дзюдо",
  ];
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

  const days = Array.from({ length: 31 }, (_, idx) => idx + 1);
  const paymentStatuses = ["Оплачено", "Неоплачено"];
  const stages = ["ученик", "ученица", "тренер"]; // Добавляем этапы

  useEffect(() => {
    // Загружаем существующих клиентов
    const fetchClients = async () => {
      try {
        const response = await fetch(
          "https://testosh.pythonanywhere.com/api/clients/",
          {
            headers: {
              Authorization: `Bearer ${getCurrentUserToken()}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setClients(data);
        } else {
          throw new Error("Ошибка загрузки клиентов.");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchClients();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Проверяем на совпадение
    const duplicate = clients.find(
      (client) =>
        client.name === formData.name &&
        client.sport_category === formData.sport_category &&
        client.month === formData.month
    );

    if (duplicate) {
      setMessage({
        type: "error",
        text: "Клиент уже добавлен в эту спортивную категорию в этом месяце.",
      });
      return;
    }

    try {
      const managerName = getManagerName();
      const clientData = {
        ...formData,
        comment: `"${managerName}": \n${formData.comment}`,
        date: `${formData.day || "1"}.${formData.month || "Январь"}.${
          formData.year || new Date().getFullYear()
        }`,
      };

      const response = await fetch(
        "https://testosh.pythonanywhere.com/api/clients/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCurrentUserToken()}`,
          },
          body: JSON.stringify(clientData),
        }
      );

      if (!response.ok) {
        throw new Error("Ошибка при добавлении клиента.");
      }

      setMessage({ type: "success", text: "Клиент успешно добавлен!" });
      setFormData({
        name: "",
        email: "",
        phone: "",
        stage: "",
        trainer: "",
        sport_category: "",
        year: "",
        month: "",
        day: "",
        comment: "",
        payment: "",
        price: "",
      });

      // Обновляем список клиентов
      const newClient = await response.json();
      setClients((prevClients) => [...prevClients, newClient]);

      if (onClientAdded) onClientAdded(clientData);
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "Ошибка при добавлении клиента.",
      });
    }
  };

  const renderInput = (name, placeholder, type = "text", options = []) =>
    options.length > 0 ? (
      <select
        name={name}
        value={formData[name]}
        onChange={handleChange}
        required
      >
        <option value="">{placeholder}</option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    ) : (
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={formData[name]}
        onChange={handleChange}
        required
      />
    );

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "auto" }}>
      <h2>Добавить клиента</h2>
      {message.text && (
        <p style={{ color: message.type === "error" ? "red" : "green" }}>
          {message.text}
        </p>
      )}
      {renderInput("name", "Имя клиента")}
      {renderInput("email", "Email", "email")}
      {renderInput("phone", "Телефон")}
      {renderInput("stage", "Выберите этап", "select", stages)}
      {renderInput("trainer", "Выберите тренера", "select", trainers)}
      {renderInput("sport_category", "Выберите вид спорта", "select", sports)}

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "10px",
          alignItems: "center",
        }}
      >
        {renderInput("day", "День", "select", days)}
        {renderInput("month", "Месяц", "select", months)}
        {renderInput("year", "Год", "select", years)}
      </div>

      {renderInput("payment", "Статус оплаты", "select", paymentStatuses)}
      {renderInput("price", "Сумма оплаты", "number")}

      <textarea
        name="comment"
        placeholder="Комментарий"
        value={formData.comment}
        onChange={handleChange}
        style={{ width: "100%", marginBottom: "10px" }}
      />
      <button
        type="submit"
        style={{
          width: "100%",
          padding: "10px",
          background: "blue",
          color: "white",
          border: "none",
        }}
      >
        Добавить клиента
      </button>
    </form>
  );
};

export default AddClientForm;
