import React from "react";
import { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import { Cookies, useCookies } from "react-cookie";
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

  const navigate = useNavigate();
  const location = useLocation();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const verifyCookie = async () => {
      try {
        const { data } = await axios.post(
          "https://finex-backend-h41g.onrender.com/",
          {},
          { withCredentials: true }
        );

        const { status, user } = data;
        if (!status) {
          removeCookie("token");
          navigate("/login");
        } else {
          setUsername(user);

          if (location.state?.justLoggedIn) {
            toast(`Hello ${user}`, {
              position: "top-right",
            });
            navigate(location.pathname, { replace: true });
          }
        }
      } catch (err) {
        console.log("Verification failed:", err);
        navigate("/login");
      }
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);
  const Logout = () => {
    removeCookie("token");
    localStorage.removeItem("userId");
    toast.success("Logout successfully", {
      position: "top-right"
    });
    navigate("/login");
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