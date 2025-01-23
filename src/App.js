import React, { useState, useEffect } from "react";
import Dashboard from "./Pages/Dashboard";
import ProductManagement from "./Pages/Product";
import OrderManagement from "./Pages/Order";
import "./style/global.css";

const App = () => {
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("products");
    return savedProducts ? JSON.parse(savedProducts) : [];
  });

  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("orders");
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  console.log("orders: ", orders);

  // Tính tổng doanh thu từ danh sách đơn hàng
  const totalRevenue = orders.reduce((sum, order) => {
    return (
      sum +
      order.products.reduce(
        (orderSum, item) => orderSum + item.product.price * item.quantity,
        0
      )
    );
  }, 0);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Quản Lý Bán Hàng</h1>
      </header>
      <main className="app-main">
        <Dashboard
          totalRevenue={totalRevenue}
          totalOrders={orders.length}
          totalProducts={products.length}
        />
        <ProductManagement products={products} setProducts={setProducts} />
        <OrderManagement products={products} setOrders={setOrders} />
      </main>
      <footer className="app-footer">
        <p>&copy; 2025 Quản Lý Bán Hàng</p>
      </footer>
    </div>
  );
};

export default App;
