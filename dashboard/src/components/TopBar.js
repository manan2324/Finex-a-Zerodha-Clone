import React, { useContext } from "react";
import { GeneralContext } from "./GeneralContext";
import { Menu as MenuIcon, Logout as LogoutIcon } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';

const TopBar = ({ logOutFn }) => {
  const { toggleSidebar } = useContext(GeneralContext);
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className="topbar">
      <div className="topbar-left">
        <button className="mobile-menu-btn" onClick={toggleSidebar}>
          <MenuIcon />
        </button>
        <div className="logo">
          <Link to="/" className="logo-link">
            <img src='logo.png' style={{ width: "30px" }} alt="Logo" />
            <span>Finex</span>
          </Link>
        </div>
      </div>
      <div className="topbar-right" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <nav className="topbar-nav">
          <ul>
            <li>
              <Link to="/" className={pathname === '/' ? 'active' : ''}>Dashboard</Link>
            </li>
            <li>
              <Link to="/orders" className={pathname === '/orders' ? 'active' : ''}>Orders</Link>
            </li>
            <li>
              <Link to="/holdings" className={pathname === '/holdings' ? 'active' : ''}>Holdings</Link>
            </li>
            <li>
              <Link to="/positions" className={pathname === '/positions' ? 'active' : ''}>Positions</Link>
            </li>
          </ul>
        </nav>
        <Button
          className="logout-btn"
          onClick={logOutFn}
          variant="contained"
          sx={{
            textTransform: 'none',
            fontWeight: 500,
            padding: '6px 16px',
            borderRadius: '8px',
            boxShadow: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '1rem',
            backgroundColor: "white",
            color: "red"
          }}
        >
          <LogoutIcon />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default TopBar;
