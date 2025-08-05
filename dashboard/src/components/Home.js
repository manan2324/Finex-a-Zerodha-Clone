import React from "react";
import { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Dashboard from "./Dashboard";
import TopBar from "./TopBar";
import WatchList from "./WatchList";
import Holdings from "./Holdings";
import Positions from "./Positions";
import Orders from "./Orders";
import { GeneralContext } from "./GeneralContext";

const Home = () => {
  const { isSidebarOpen, toggleSidebar } = useContext(GeneralContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  // Closes sidebar on mobile when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isSidebarOpen && !event.target.closest('.sidebar') && !event.target.closest('.mobile-menu-btn')) {
        toggleSidebar();
      }
    };

    if (window.innerWidth <= 1024) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isSidebarOpen, toggleSidebar]);


  useEffect(() => {
    const verifySession = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/verify`,
          { withCredentials: true }
        );

        const { status, user } = data;
        if (!status) {
          navigate("/login");
        } else {
          //Store userId in localStorage
          if (user && user._id) {
            localStorage.setItem("userId", user._id);
          }

          // Check for Google or local login success indicator
          const params = new URLSearchParams(location.search);
          const urlJustLoggedIn = params.get("justLoggedIn");
          const stateJustLoggedIn = location.state?.justLoggedIn;

          if (urlJustLoggedIn || stateJustLoggedIn) {
            toast.success(
              `Hello ${user.username}!`,
              { position: "top-right" }
            );

            // Clear the justLoggedIn flag so toast only shows once
            if (urlJustLoggedIn) {
              // Remove from URL without reloading the page
              params.delete("justLoggedIn");
              navigate({
                pathname: location.pathname,
                search: params.toString(),
              }, { replace: true });
            } else {
              navigate(location.pathname, { replace: true, state: {} });
            }
          }
          setLoading(false);
        }
      } catch (err) {
        setLoading(false);
        navigate("/login");
      }
    };
    verifySession();
  }, [navigate, location.search, location.state]);

  const Logout = async () => {
    try {
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}/logout`, {
        withCredentials: true,
      });
      localStorage.removeItem("userId");
      toast.success("Logout successfully", {
        position: "top-right"
      });
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
      toast.error("Logout failed");
    }
  };

  if (loading) {
    return (
      <div class="loader">
        <div class="justify-content-center jimu-primary-loading"></div>
      </div>
    );
  }

  return (
    <>
      <div className="app-container">
        <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
          <WatchList />
        </aside>
        <main className="main-content">
          <TopBar logOutFn={Logout} />
          <div className="content-area">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/holdings" element={<Holdings />} />
              <Route path="/positions" element={<Positions />} />
              <Route path="/orders" element={<Orders />} />
            </Routes>
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;