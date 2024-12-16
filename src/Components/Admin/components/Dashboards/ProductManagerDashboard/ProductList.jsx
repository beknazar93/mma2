import React from "react";

const ProductList = ({ products, setProducts }) => {
  const handleDelete = async (productId) => {
    try {
      const token = localStorage.getItem("access");
      if (!token) {
        throw new Error("Токен отсутствует. Авторизация требуется.");
      }

      const response = await fetch(
        `https://testosh.pythonanywhere.com/api/products/${productId}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Не удалось удалить товар.");
      }

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
    } catch (error) {
      console.error("Ошибка удаления товара:", error);
      alert(error.message);
    }
  };

  return (
    <div style={{ overflowX: "auto", maxHeight: "400px" }}>
      <table border={1} style={{ width: "100%", tableLayout: "auto" }}>
        <thead
          style={{
            position: "sticky",
            top: 0,
            backgroundColor: "#fff",
            zIndex: 1,
          }}
        >
          <tr>
            <th>№</th>
            <th>Наименование</th>
            <th>Цена покупки</th>
            <th>Наценка</th>
            <th>Цена с наценкой</th>
            <th>Дата покупки</th>
            <th>Количество на складе</th>
            <th>Продано</th>
            <th>Цена продажи</th>
            <th>Статус</th>
            <th>Дата последней продажи</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, idx) => {
            const soldCount = product.sales ? product.sales.length : 0;
            const soldPrices = product.sales
              ? product.sales.map((sale) => sale.sale_price).join(", ")
              : "—";

            return (
              <tr key={product.id}>
                <td>{idx + 1}</td>
                <td>{product.name}</td>
                <td>{product.purchase_price} сом</td>
                <td>{product.markup}%</td>
                <td>{product.final_price} сом</td>
                <td>{product.purchase_date}</td>
                <td>{product.quantity - soldCount} шт.</td>
                <td>{soldCount} шт.</td>
                <td>{soldPrices}</td>
                <td>{product.is_sold ? "Продан" : "В наличии"}</td>
                <td>{product.sale_date || "—"}</td>
                <td>
                  <button
                    onClick={() => handleDelete(product.id)}
                    style={{
                      backgroundColor: "#f44336",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      cursor: "pointer",
                    }}
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
