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
  const [username, setUsername] = useState("");

  // This effect adds a listener to close the sidebar when clicking outside of it on mobile
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
          {withCredentials: true}
        );

        const { status, user } = data;
        if (!status) {
          navigate("/login");
        } else {
          setUsername(user);

          if (location.state?.justLoggedIn) {
            toast(`Hello ${user}`, {
              position: "top-right",
            });
            // Remove the justLoggedIn flag after showing the toast
            navigate(location.pathname, { replace: true, state: {} });
          }
        }
      } catch (err) {
        console.log("Verification failed:", err);
        navigate("/login");
      }
    };
    verifySession();
  }, [navigate, location.state]);

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