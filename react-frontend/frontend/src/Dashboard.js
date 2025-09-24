import './App.css';
import { useState ,useEffect  } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BrowserRouter, Routes, Route, Link, Outlet, Router } from 'react-router-dom';


function DashBoard() {
    const location = useLocation();
    const navigate = useNavigate();
    const loginUrl = location.state?.from?.pathname || "/login";
    const storedToken = sessionStorage.getItem("accessToken");
        
   useEffect(()=> {

        if (!storedToken){
            navigate(loginUrl, { replace: true });
        } 
    }, [storedToken, navigate, loginUrl]);
     
return (
        <h1>Welcome to Dashboard</h1>
)
};
export default DashBoard
