import React, { useState } from "react";

const SellProductForm = ({ onSellProduct, products }) => {
  const [formData, setFormData] = useState({
    product: "",
    sale_date: "",
    sale_price: "",
    quantity: 1, // Добавляем поле для количества
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedProduct = products.find(
      (product) => product.id === parseInt(formData.product)
    );

    if (!selectedProduct) {
      alert("Товар не выбран.");
      return;
    }

    if (parseInt(formData.quantity) > selectedProduct.quantity) {
      alert("Недостаточно товара на складе.");
      return;
    }

    try {
      const token = localStorage.getItem("access");
      const response = await fetch(
        "https://testosh.pythonanywhere.com/api/sales/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Добавляем токен авторизации
          },
          body: JSON.stringify({
            product: formData.product,
            sale_date: formData.sale_date,
            sale_price: parseFloat(formData.sale_price),
            quantity: parseInt(formData.quantity), // Передаем количество в запрос
          }),
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          alert("Ошибка авторизации. Попробуйте войти заново.");
        }
        throw new Error("Ошибка при продаже товара.");
      }

      const saleResult = await response.json();

      // Вызываем callback для успешной продажи, если передан
      if (onSellProduct) {
        onSellProduct({
          product: selectedProduct,
          sale: saleResult,
          soldQuantity: parseInt(formData.quantity),
        });
      }

      // Сброс формы после успешной продажи
      setFormData({
        product: "",
        sale_date: "",
        sale_price: "",
        quantity: 1,
      });
    } catch (error) {
      console.error("Ошибка:", error.message);
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <select
        name="product"
        value={formData.product}
        onChange={handleChange}
        required
      >
        <option value="">Выберите товар</option>
        {products.map((product) => (
          <option key={product.id} value={product.id}>
            {product.name} ({product.quantity} шт.)
          </option>
        ))}
      </select>
      <input
        type="date"
        name="sale_date"
        value={formData.sale_date}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="sale_price"
        placeholder="Цена продажи"
        value={formData.sale_price}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="quantity"
        value={formData.quantity}
        onChange={handleChange}
        min="1"
        max={
          products.find((product) => product.id === parseInt(formData.product))
            ?.quantity || 0
        }
        required
      />
      <button type="submit">Продать</button>
    </form>
  );
};

export default SellProductForm;
