import React, { useState } from "react";
import Header from "./redux/Pages/Header.jsx";
import './App.css';
import Product from "./redux/Pages/Product.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./redux/Pages/Login";
import Dashboard from "./redux/Pages/Dashboard"
import SignUp from "./redux/Pages/SignUp";
import { useLocation } from "react-router-dom";
import ProtectedRoute from "./redux/Pages/ProtectedRoute";
import PageNotFound from "./redux/Pages/PageNotFound"
import POS from "./redux/Pages/POS";
import CheckOut from "./redux/Pages/CheckOut.jsx";
import OrdersHistory from "./redux/Pages/OrdersHistory.jsx";

const AppLayout = () => {
  const location = useLocation();
  const showHeader = location.pathname === "/Product";

  return (
    <>
      {showHeader && <Header />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="*" element={<PageNotFound />} />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route path="/POS" element={
          <ProtectedRoute>
            <POS />
          </ProtectedRoute>
        } />

        <Route path="/checkout" element={
          <ProtectedRoute>
            <CheckOut />
          </ProtectedRoute>
        } />

                <Route path="/orders-history" element={
          <ProtectedRoute>
            <OrdersHistory />
          </ProtectedRoute>
        } />



        <Route path="/Product" element={
          <ProtectedRoute>
            <Product />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
