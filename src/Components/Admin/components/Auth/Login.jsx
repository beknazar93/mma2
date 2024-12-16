import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Индикация загрузки
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Сброс ошибок перед новым запросом

    try {
      // Отправляем запрос на вход
      const response = await axios.post(
        "https://testosh.pythonanywhere.com/login/",
        {
          username,
          password,
        }
      );

      // Сохраняем токены в локальное хранилище
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);

      // Запрашиваем профиль пользователя для получения роли и имени
      const profileResponse = await axios.get(
        "https://testosh.pythonanywhere.com/profile/",
        {
          headers: {
            Authorization: `Bearer ${response.data.access}`,
          },
        }
      );

      const userRole = profileResponse.data.role;
      const managerName = profileResponse.data.username; // Имя менеджера

      // Сохраняем имя менеджера
      localStorage.setItem("manager_name", managerName);

      // Перенаправляем в зависимости от роли
      switch (userRole) {
        case "admin":
          navigate("/admin/adminDashboard");
          break;
        case "client_manager":
          navigate("/admin/client-managerDashboard");
          break;
        case "product_manager":
          navigate("/admin/product-managerDashboard");
          break;
        case "hr_manager":
          navigate("/admin/hr-managerDashboard");
          break;
        case "employee":
          navigate("/admin/employeeDashboard");
          break;
        default:
          setError("Неизвестная роль пользователя");
      }
    } catch (error) {
      if (error.response?.status === 401) {
        setError("Неверное имя пользователя или пароль.");
      } else {
        setError("Ошибка подключения к серверу. Попробуйте позже.");
      }
      console.error("Ошибка входа:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <h2>Вход в CRM MMA</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input
          type="text"
          placeholder="Имя пользователя"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <div style={{ position: "relative", width: "100%" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              paddingRight: "50px", // Оставляем место для кнопки справа
              boxSizing: "border-box", // Учитываем отступы в размере поля
            }}
          />
          <button
            type="button"
            style={{
              position: "absolute",
              right: "-120px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "0",
              color: "#333", // Цвет кнопки
              fontSize: "14px", // Размер текста кнопки
            }}
            onClick={(e) => {
              e.preventDefault();
              setShowPassword((prev) => !prev); // Переключение пароля
            }}
          >
            {showPassword ? "Скрыть" : "Показать"}
          </button>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Вход..." : "Войти"}
        </button>
        <Link to="register">
          <p>Если еще нет аккаунта?</p>
        </Link>
      </form>
    </>
  );
};

export default Login;
