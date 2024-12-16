import React, { useState, useEffect } from "react";
import AddProductForm from "./AddProductForm";
import SellProductForm from "./SellProductForm";
import ProductList from "./ProductList";
import { fetchWithAuth } from "../../../api/auth"; // Функция для запросов с токеном
import "./ProductManagement.scss";

const ProductManagerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [activeTab, setActiveTab] = useState("products");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [managerName, setManagerName] = useState("Неизвестный менеджер"); // Имя менеджера

  // Получение имени менеджера
  useEffect(() => {
    const fetchManagerName = async () => {
      try {
        const response = await fetchWithAuth(
          "https://testosh.pythonanywhere.com/api/profile/"
        );
        if (response.ok) {
          const data = await response.json();
          setManagerName(data.username || "Неизвестный менеджер");
        } else {
          throw new Error("Ошибка загрузки имени менеджера");
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchManagerName();
  }, []);

  // Функция для загрузки списка товаров
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetchWithAuth(
          "https://testosh.pythonanywhere.com/api/products/"
        );
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          throw new Error("Ошибка загрузки товаров");
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchProducts();
  }, []);

  // Обработчик добавления товара
  const handleAddProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
    setSuccess("Товар успешно добавлен!");
    setTimeout(() => setSuccess(""), 3000); // Очистить сообщение через 3 секунды
  };

  // Обработчик продажи товара
  const handleSellProduct = (soldProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === soldProduct.id
          ? { ...product, quantity: product.quantity - soldProduct.quantity }
          : product
      )
    );

    setSales((prevSales) => [...prevSales, soldProduct]);
    setSuccess("Товар успешно продан!");
    setTimeout(() => setSuccess(""), 3000); // Очистить сообщение через 3 секунды
  };

  // Обработчик выхода
  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    window.location.href = "/admin"; // Перенаправление на страницу входа
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div>
          <h1>Панель управления продуктами</h1>
          <p className="manager-info">
            Менеджер: <strong>{managerName}</strong>
          </p>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          Выйти
        </button>
      </header>

      {/* Сообщения об ошибке или успехе */}
      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => setError("")} className="close-btn">
            ✖
          </button>
        </div>
      )}
      {success && (
        <div className="success-message">
          <p>{success}</p>
          <button onClick={() => setSuccess("")} className="close-btn">
            ✖
          </button>
        </div>
      )}

      {/* Таб-меню */}
      <div className="tab-menu">
        <button
          className={`tab-button ${activeTab === "products" ? "active" : ""}`}
          onClick={() => setActiveTab("products")}
        >
          Список товаров
        </button>
        <button
          className={`tab-button ${activeTab === "add" ? "active" : ""}`}
          onClick={() => setActiveTab("add")}
        >
          Добавить товар
        </button>
        <button
          className={`tab-button ${activeTab === "sell" ? "active" : ""}`}
          onClick={() => setActiveTab("sell")}
        >
          Продать товар
        </button>
      </div>

      {/* Контент табов */}
      <div className="tab-content">
        {activeTab === "products" && (
          <ProductList products={products} setProducts={setProducts} />
        )}

        {activeTab === "add" && (
          <div className="form-container">
            <h2>Добавить товар</h2>
            <AddProductForm onAddProduct={handleAddProduct} />
          </div>
        )}

        {activeTab === "sell" && (
          <div className="form-container">
            <h2>Продать товар</h2>
            <SellProductForm
              products={products}
              onSellProduct={handleSellProduct}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductManagerDashboard;
