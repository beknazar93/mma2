import React, { useState } from "react";

const AddProductForm = ({ onAddProduct }) => {
  const [formData, setFormData] = useState({
    name: "",
    purchase_price: "",
    markup: "",
    purchase_date: "",
    quantity: "",
  });

  const [error, setError] = useState("");
  const fetchWithAuth = async (url, options = {}) => {
    let accessToken = localStorage.getItem("access");

    if (!accessToken) {
      throw new Error("Требуется авторизация.");
    }

    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Если токен недействителен, пробуем обновить
    if (response.status === 401) {
      const refreshToken = localStorage.getItem("refresh");

      if (!refreshToken) {
        throw new Error("Требуется повторная авторизация.");
      }

      const refreshResponse = await fetch(
        "https://testosh.pythonanywhere.com/token/refresh/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refresh: refreshToken }),
        }
      );

      if (!refreshResponse.ok) {
        throw new Error("Ошибка обновления токена.");
      }

      const refreshData = await refreshResponse.json();
      accessToken = refreshData.access;
      localStorage.setItem("access", accessToken);

      // Повторяем запрос с обновлённым токеном
      return fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }

    return response;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetchWithAuth(
        "https://testosh.pythonanywhere.com/api/products/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) throw new Error("Ошибка при добавлении товара.");
      const newProduct = await response.json();
      onAddProduct(newProduct);

      setFormData({
        name: "",
        purchase_price: "",
        markup: "",
        purchase_date: "",
        quantity: "",
      });
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        name="name"
        placeholder="Наименование"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="purchase_price"
        placeholder="Цена покупки"
        value={formData.purchase_price}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="markup"
        placeholder="Наценка (%)"
        value={formData.markup}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="quantity"
        placeholder="Количество"
        value={formData.quantity}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="purchase_date"
        value={formData.purchase_date}
        onChange={handleChange}
        required
      />
      <button type="submit">Добавить</button>
    </form>
  );
};

export default AddProductForm;
