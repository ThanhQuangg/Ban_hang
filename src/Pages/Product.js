import React, { useState } from "react";
import "../style/product.css";

const ProductManagement = ({ products, setProducts }) => {
  const [newProduct, setNewProduct] = useState({ name: "", price: "" });

  const addProduct = () => {
    setProducts([...products, { ...newProduct, id: Date.now() }]);
    setNewProduct({ name: "", price: "" });
  };

  return (
    <div className="product-management">
      <h2>Quản Lý Sản Phẩm</h2>
      <div className="form">
        <input
          type="text"
          placeholder="Tên sản phẩm"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Giá sản phẩm"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <button onClick={addProduct}>Thêm</button>
      </div>
      <ul className="product-list">
        {products.map((product) => (
          <li key={product.id} className="product-item">
            {product.name} - {product.price.toLocaleString()} VND
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductManagement;