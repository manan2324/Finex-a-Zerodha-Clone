import React, { useState, useEffect, useContext } from "react";
import { GeneralContext } from "./GeneralContext";
import axios from "axios";  

const Summary = () => {
  const [allHoldings, setAllHoldings] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return

    axios.get(`https://finex-backend-h41g.onrender.com/holdings/userHoldings/${userId}`).then((res) => {
      setAllHoldings(res.data);
    });
  }, []);

  const { getAiAnalysis } = useContext(GeneralContext);

  // --- Calculate summary values dynamically ---
  const investment = allHoldings.reduce((sum, h) => sum + (h.avg * h.qty), 0);
  const currentValue = allHoldings.reduce((sum, h) => sum + (h.price * h.qty), 0);
  const pnl = currentValue - investment;
  const pnlPercent = investment > 0 ? ((pnl / investment) * 100).toFixed(2) : "0.00";

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 className="card-title" style={{ marginBottom: 0 }}>Account Summary</h2>
      </div>
      <button className="action-btn btn-analyze btn-full-width" onClick={() => getAiAnalysis('portfolio', allHoldings)}>
        ✨ Summarize My Portfolio
      </button>
      <div className="summary-item" style={{ marginTop: '1.5rem' }}>
        <h3 className="summary-title">Equity</h3>
        <p className="summary-main-value">₹{currentValue.toFixed(2)}</p>
        <div className="summary-details">
          <span>Margin Used: ₹0.00</span>
          <span>Opening Balance: ₹{currentValue.toFixed(2)}</span>
        </div>
      </div>
      <div className="summary-item">
        <h3 className="summary-title">Holdings P&L</h3>
        <p className={`summary-main-value ${pnl >= 0 ? 'text-profit' : 'text-loss'}`}>
          ₹{pnl.toFixed(2)}
          <span className={`summary-pnl-percent ${pnl >= 0 ? 'text-profit' : 'text-loss'}`}>
            {pnl >= 0 ? '+' : ''}{pnlPercent}%
          </span>
        </p>
        <div className="summary-details">
          <span>Current Value: ₹{currentValue.toFixed(2)}</span>
          <span>Investment: ₹{investment.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default Summary;
