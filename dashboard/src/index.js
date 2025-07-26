import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/ReactToastify.css";
import "./index.css";
import { ToastContainer } from 'react-toastify';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from "./components/Login";
import { CookiesProvider } from "react-cookie";
import { GeneralContextProvider } from './components/GeneralContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CookiesProvider>
    <GeneralContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </GeneralContextProvider>
  </CookiesProvider>
);
