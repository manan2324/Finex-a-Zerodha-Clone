import React, { useState, useEffect, useContext } from "react";
import { GeneralContext } from "./GeneralContext";
import axios from "axios";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;
    // Fetch common holdings for all users
    axios.get(`https://finex-backend-h41g.onrender.com/holdings/userHoldings/${userId}`).then((res) => {
      setAllHoldings(res.data);
    });
  }, []);

  const { getAiAnalysis } = useContext(GeneralContext);
  return (
    <div className="card">
      <h2 className="card-title">Holdings ({allHoldings.length})</h2>
      {allHoldings.length > 0 ?
        (
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Instrument</th>
                  <th>Qty.</th>
                  <th>Avg. Cost</th>
                  <th>LTP</th>
                  <th>P&L</th>
                  <th>Day %</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {allHoldings.map((stock) => {
                  const pnl = (stock.price - stock.avg) * stock.qty;
                  const isProfit = pnl >= 0;
                  return (
                    <tr key={stock.name}>
                      <td data-label="Instrument">{stock.name}</td>
                      <td data-label="Qty.">{stock.qty}</td>
                      <td data-label="Avg. Cost">{stock.avg.toFixed(2)}</td>
                      <td data-label="LTP">{stock.price.toFixed(2)}</td>
                      <td data-label="P&L" className={isProfit ? 'text-profit' : 'text-loss'}>{pnl.toFixed(2)}</td>
                      <td data-label="Day %" className={stock.isLoss ? 'text-loss' : 'text-profit'}>{stock.day}</td>
                      <td data-label="Actions" className="actions-cell text-center">
                        <button className="action-btn btn-analyze" onClick={() => getAiAnalysis('stock', stock.name)}>✨ Analyze</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (<p className="text-center text-secondary">Currently user hasn't any holdings.</p>)
      }
    </div>
  );
};

export default Holdings;
