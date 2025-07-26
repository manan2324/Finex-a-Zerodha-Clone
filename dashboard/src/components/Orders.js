import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    axios
      .get(`https://finex-backend-h41g.onrender.com/orders/allOrders/${userId}`)
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch orders:", err);
        setLoading(false);
      });
  }, [])

  const handleDeleteHistory = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;
    try {
      await axios.delete(`https://finex-backend-h41g.onrender.com/orders/allOrders/${userId}`);
      setOrders([]);
    } catch (err) {
      console.error("Failed to delete order history:", err);
    }
  };

  if (loading) return <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}><CircularProgress color="inherit" /></Box>

  return (
    <div className="card">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          marginBottom: "1rem"
        }}
      >
        <h2 className="card-title" style={{ marginBottom: 0 }}>Orders ({orders.length})</h2>
        <button
          className="action-btn"
          style={{
            backgroundColor: "#e74c3c",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            padding: "0.5rem 1rem",
            fontWeight: 500,
            fontSize: "1rem",
            cursor: "pointer",
            marginLeft: "1rem",
            marginBottom: "0",
            transition: "opacity 0.2s",
            whiteSpace: "nowrap"
          }}
          onClick={handleDeleteHistory}
        >
          Delete History
        </button>
      </div>
      {orders.length > 0 ? (
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Instrument</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Mode</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td data-label="Instrument">{order.name}</td>
                  <td data-label="Qty">{order.qty}</td>
                  <td data-label="Price">{order.price.toFixed(2)}</td>
                  <td data-label="Mode" className={order.mode === 'BUY' ? 'text-profit' : 'text-loss'}>
                    {order.mode}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-secondary">You haven't placed any orders today.</p>
      )}
    </div>
  );
};

export default Orders;
