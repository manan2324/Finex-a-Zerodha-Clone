import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { GeneralContext } from "./GeneralContext";

const Positions = () => {
  const [allPostions, setAllPostions] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3002/positions/allPositions").then((res) => {
      setAllPostions(res.data);
    });
  }, []);

  const { getAiAnalysis } = useContext(GeneralContext);
  return (
    <div className="card">
      <h2 className="card-title">Positions ({allPostions.length})</h2>
      {allPostions.length > 0 ? (
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Instrument</th>
                <th>Qty.</th>
                <th>Avg.</th>
                <th>LTP</th>
                <th>P&L</th>
                <th>Day %</th>
              </tr>
            </thead>
            <tbody>
              {allPostions.map((stock) => {
                const pnl = (stock.price - stock.avg) * stock.qty;
                const isProfit = pnl >= 0;
                return (
                  <tr key={stock.name}>
                    <td data-label="Product">{stock.product}</td>
                    <td data-label="Instrument">{stock.name}</td>
                    <td data-label="Qty.">{stock.qty}</td>
                    <td data-label="Avg.">{stock.avg.toFixed(2)}</td>
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
      ) : (
        <p className="text-center text-secondary">No open positions.</p>
      )}
    </div>
  );
};

export default Positions;