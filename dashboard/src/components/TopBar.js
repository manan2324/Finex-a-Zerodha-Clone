import React, { useContext, useEffect, useState } from "react";
import { GeneralContext } from "./GeneralContext";
import { Menu as MenuIcon, Logout as LogoutIcon, LightMode, DarkMode } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { IconButton, Button, Avatar, Tooltip, tooltipClasses, Menu, MenuItem, Divider } from "@mui/material";
import axios from "axios";

const TopBar = ({ logOutFn }) => {
  const { toggleSidebar } = useContext(GeneralContext);
  const location = useLocation();
  const pathname = location.pathname;

  const [user, setUser] = useState(null);
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem('theme') === 'dark'
  );
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  // Fetch user data on mount
  useEffect(() => {
    const getUserdata = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/verify`,
          { withCredentials: true }
        );
        setUser(data.user ?? null);
      } catch (error) {
        setUser(null);
        console.error('Failed to fetch user:', error);
      }
    };
    getUserdata();
  }, []);

  // Set theme on mount and sync state
  useEffect(() => {
    const dark = localStorage.getItem('theme') === 'dark';
    setIsDark(dark);
    document.body.classList.toggle('dark-theme', dark);
  }, []);

  // Theme toggler
  const toggleTheme = () => {
    setIsDark((prev) => {
      const newTheme = !prev;
      document.body.classList.toggle('dark-theme', newTheme);
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
      return newTheme;
    });
  };

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  function stringToColor(string) {
    let hash = 0;
    for (let i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  }

  function stringAvatar(name) {
    const validName = typeof name === "string" && name.trim() ? name : "User";
    const parts = validName.split(' ');

    // Always use first letter of first word
    const first = parts[0][0].toUpperCase();
    // Use first letter of second word, if exists, otherwise empty
    const second = parts[1] ? parts[1][0].toUpperCase() : '';
    return {
      sx: {
        bgcolor: stringToColor(validName),
      },
      children: `${first}${second}`,
    };
  }

  const tooltipMarginProp = {
    popper: {
      sx: {
        [`&.${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]:
        {
          marginTop: '8px',
        },
        [`&.${tooltipClasses.popper}[data-popper-placement*="top"] .${tooltipClasses.tooltip}`]:
        {
          marginBottom: '0px',
        },
        [`&.${tooltipClasses.popper}[data-popper-placement*="right"] .${tooltipClasses.tooltip}`]:
        {
          marginLeft: '0px',
        },
        [`&.${tooltipClasses.popper}[data-popper-placement*="left"] .${tooltipClasses.tooltip}`]:
        {
          marginRight: '0px',
        },
      },
    },
  };

  return (
    <div className="topbar">
      <div className="topbar-left">
        <button className="mobile-menu-btn" onClick={toggleSidebar} style={{ background: "none", border: "none" }}>
          <MenuIcon sx={{ color: 'var(--text-primary)' }} />
        </button>
        <div className="logo">
          <Link to="/" className="logo-link">
            <img src="logo.png" style={{ width: "30px" }} alt="Logo" />
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

        <div className="topbar-right-icons">
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            sx={{ minWidth: 0, p: 0 }}
          >
            <Tooltip title="My Profile" arrow slotProps={tooltipMarginProp}>
              <Avatar {...stringAvatar(user?.username ?? "User")} />
            </Tooltip>
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
              list: {
                'aria-labelledby': 'basic-button',
                style: {
                  background: 'var(--card-bg-color)',
                  color: 'var(--text-primary)',
                }
              },
            }}
            PaperProps={{
              sx: {
                backgroundColor: 'var(--card-bg-color)',
                color: 'var(--text-primary)',
                boxShadow: '0 4px 24px var(--shadow-color)',
              }
            }}
          >
            {user ? (
              <>
                <MenuItem onClick={handleClose}>Username: @{user.username}</MenuItem>
                <MenuItem onClick={handleClose}>Email: {user.email}</MenuItem>
                <Divider />
                <Button
                  className="logout-btn"
                  onClick={logOutFn}
                  variant="contained"
                  sx={{
                    marginLeft: "0.75rem",
                    textTransform: 'none',
                    fontWeight: 500,
                    padding: '6px 16px',
                    borderRadius: '8px',
                    boxShadow: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '1rem',
                    backgroundColor: 'var(--card-bg-color)',
                    color: 'var(--danger-color)',
                    '&:hover': {
                      backgroundColor: 'var(--danger-color)',
                      color: '#fff',
                    },
                  }}
                >
                  <LogoutIcon />
                  Logout
                </Button>
              </>
            ) : (
              <MenuItem disabled>Please log in</MenuItem>
            )}
          </Menu>

          <Tooltip title="Switch mode" arrow slotProps={tooltipMarginProp}>
            <IconButton onClick={toggleTheme} color="inherit">
              {isDark ? <LightMode /> : <DarkMode />}
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
