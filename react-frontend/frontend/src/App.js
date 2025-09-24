
import './App.css';
import { useState } from 'react';
import RegisterPage from './RegisterForm';
import LoginPage from './LoginForm';
import DashBoard from './Dashboard';
import { BrowserRouter, Routes, Route, Link, Outlet, Router } from 'react-router-dom';


// LoginPage Component

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<DashBoard />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<div className="min-h-screen flex items-center justify-center text-xl">404 - Not Found</div>} />
    </Routes>
  );
}
export default App;