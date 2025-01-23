import React, { useState } from "react";
import "../style/order.css";

const OrderManagement = ({ products, setOrders }) => {
  const [orders, setOrdersState] = useState(() => {
    const savedOrders = localStorage.getItem("orders");
    console.log("Saved Orders:", savedOrders);
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  const [newOrder, setNewOrder] = useState([{ productId: "", quantity: 1 }]);

  const addOrder = () => {
    const orderDetails = newOrder.map((item) => {
      const product = products.find((p) => p.id === parseInt(item.productId));
      return { product, quantity: item.quantity };
    });

    const isValidOrder = orderDetails.every(
      (item) => item.product && item.quantity > 0
    );

    if (isValidOrder) {
      // Tính tổng tiền cho đơn hàng
      const totalAmount = orderDetails.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );

      // Tìm id lớn nhất và tăng dần
      const nextId =
        orders.length > 0
          ? Math.max(...orders.map((order) => order.id)) + 1
          : 1;

      // Thêm ngày hiện tại vào đơn hàng
      const currentDate = new Date().toLocaleString(); // Lấy ngày và giờ hiện tại

      const updatedOrders = [
        ...orders,
        {
          id: nextId,
          date: currentDate, // Thêm ngày vào đơn hàng
          products: orderDetails,
          totalAmount, // Lưu tổng tiền
        },
      ];

      setOrdersState(updatedOrders);
      setOrders(updatedOrders);

      // Lưu vào localStorage
      localStorage.setItem("orders", JSON.stringify(updatedOrders));

      // Reset form
      setNewOrder([{ productId: "", quantity: 1 }]);
    } else {
      alert("Vui lòng kiểm tra thông tin sản phẩm!");
    }
  };

  const addProductField = () => {
    setNewOrder([...newOrder, { productId: "", quantity: 1 }]);
  };

  const handleProductChange = (index, field, value) => {
    const updatedOrder = newOrder.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setNewOrder(updatedOrder);
  };

  const deleteOrder = (orderId) => {
    // Lọc ra các đơn hàng không có ID bị xóa
    const updatedOrders = orders.filter((order) => order.id !== orderId);

    // Cập nhật state và localStorage
    setOrdersState(updatedOrders);
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  return (
    <div className="order-management">
      <h2>Quản Lý Đơn Hàng</h2>
      <div className="form">
        {newOrder.map((item, index) => (
          <div key={index} className="product-input">
            <select
              value={item.productId}
              onChange={(e) =>
                handleProductChange(index, "productId", e.target.value)
              }
            >
              <option value="">Chọn sản phẩm</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) =>
                handleProductChange(index, "quantity", parseInt(e.target.value))
              }
              placeholder="Số lượng"
            />
          </div>
        ))}
        <button onClick={addProductField}>+ Thêm sản phẩm</button>
        <button onClick={addOrder}>Thêm Đơn Hàng</button>
      </div>

      <ul className="order-list">
        {orders?.map((order) => (
          <li key={order.id} className="order-item">
            <div>
              Đơn hàng #{order.id}{" "}
              <button
                onClick={() => deleteOrder(order.id)}
                className="delete-button"
              >
                Xóa
              </button>{" "}
              {/* Nút xóa */}
            </div>
            <div>Ngày đặt hàng: {order.date}</div>
            <ul>
              {order.products.map((productItem, idx) => (
                <li key={idx}>
                  {productItem.product.name} - {productItem.quantity} x{" "}
                  {productItem.product.price.toLocaleString()} VND ={" "}
                  {(
                    productItem.quantity * productItem.product.price
                  ).toLocaleString()}{" "}
                  VND
                </li>
              ))}
            </ul>
            <div>
              <strong>Tổng tiền: </strong>
              {order.totalAmount.toLocaleString()} VND
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderManagement;
