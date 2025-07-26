import React, { useState, useContext } from "react";
import { GeneralContext } from "./GeneralContext";
import { watchlist } from "../data/data";

const WatchListItem = ({ stock }) => {
  const { openActionWindow, getAiAnalysis } = useContext(GeneralContext);

  return (
    <li className="watchlist-item">
      <div>
        <p className="stock-name">{stock.name}</p>
      </div>
      <div className="stock-details">
        <p className="stock-price">{stock.price.toFixed(2)}</p>
        <p className={`stock-percent ${stock.isDown ? 'text-loss' : 'text-profit'}`}>
          {stock.percent}
        </p>
      </div>
      <div className="watchlist-actions">
        <button className="action-btn btn-buy" onClick={() => openActionWindow(stock.name, 'BUY')}>Buy</button>
        <button className="action-btn btn-sell" onClick={() => openActionWindow(stock.name, 'SELL')}>Sell</button>
        <button className="action-btn btn-analyze" onClick={() => getAiAnalysis('stock', stock.name)}>✨</button>
      </div>
    </li>
  );
};

const WatchList = () => {
  const [search, setSearch] = useState("");
  const { toggleSidebar } = useContext(GeneralContext);
  const filteredList = watchlist.filter(stock =>
    stock.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="watchlist">
      <div className="watchlist-header" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <input
          type="text"
          placeholder="Search stocks..."
          className="watchlist-search"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button
          className="action-btn btn-cancel"
          style={{
            display: 'none',
            marginLeft: '0.5rem',
            padding: '0.5rem',
            fontSize: '1.2rem',
            backgroundColor: '#ecf0f1',
            color: '#7f8c8d',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            lineHeight: 0
          }}
          onClick={toggleSidebar}
          aria-label="Close"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M6 6L14 14M14 6L6 14" stroke="#7f8c8d" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        <style>{`
          @media (max-width: 1024px) {
            .btn-cancel {
              display: block !important;
            }
          }
        `}</style>
      </div>
      <ul className="watchlist-list">
        {filteredList.map((stock) => (
          <WatchListItem key={stock.name} stock={stock} />
        ))}
      </ul>
    </div>
  );
};

export default WatchList;
