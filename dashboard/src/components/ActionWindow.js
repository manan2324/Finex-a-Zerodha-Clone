import React, { useContext, useState } from "react";
import axios from "axios";
import {GeneralContext} from "./GeneralContext";
import { Close as CloseIcon } from "@mui/icons-material";

const ActionWindow = () => {
  const { actionWindowState, closeActionWindow } = useContext(GeneralContext);
  const { uid, mode } = actionWindowState;
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState('');

  const buttonClass = mode === 'SELL' ? 'btn-sell' : 'btn-buy';
  const title = `${mode} ${uid}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");

    try {
      await axios.post("https://finex-backend.onrender.com/orders/newOrder", {
        userId: userId,
        name: uid,
        qty: quantity,
        price: price,
        mode: mode.toUpperCase(),
      });
      closeActionWindow();
      window.location.reload(); // reload to fetch updated holdings
    } catch (err) {
      console.error("New Order Error:", err.response?.data || err.message);
      closeActionWindow();
    }
  };

  return (
    <div className="modal-overlay" onClick={closeActionWindow}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button onClick={closeActionWindow} className="modal-close-btn"><CloseIcon /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Market price"
              step="0.01"
            />
          </div>
          <div className="modal-footer">
            <button type="button" className="action-btn btn-cancel" onClick={closeActionWindow}>Cancel</button>
            <button type="submit" className={`action-btn ${buttonClass}`}>{mode}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActionWindow;
