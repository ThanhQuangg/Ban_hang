import React from "react";
import "../style/dashboard.css";

const Dashboard = ({ totalRevenue, totalOrders, totalProducts }) => {
  return (
    <div className="dashboard">
      <h2>Tổng Quan</h2>
      <div className="dashboard-stats">
        <div className="stat">
          <h3>Doanh Thu</h3>
          <p>{totalRevenue.toLocaleString()} VND</p>
        </div>
        <div className="stat">
          <h3>Đơn Hàng</h3>
          <p>{totalOrders}</p>
        </div>
        <div className="stat">
          <h3>Sản Phẩm</h3>
          <p>{totalProducts}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;