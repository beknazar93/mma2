import React, { useState } from "react";
import ProductList from "../ProductManagerDashboard/ProductManagerDashboard";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);

  return (
    <div>
      <h2>Управление товарами</h2>
      <ProductList products={products} setProducts={setProducts} />
    </div>
  );
};

export default ProductManagement;
