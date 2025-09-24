
import './App.css';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BrowserRouter, Routes, Route, Link, Outlet, Router } from 'react-router-dom';

function LoginPage() {
  const [username , setUsername] = useState('');
  const [password , setPassword] = useState('');
  const [FormData , setFormdata] = useState({username:'',password:''});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
          console.log('Login submitted:', {username, password });
          const deashBoardUrl = location.state?.from?.pathname || "/dashboard";
    
      try {
            const response = await fetch('http://127.0.0.1:8000/login', {
            method: 'POST',
            headers:{'Content-Type': 'application/x-www-form-urlencoded'},
            body: new URLSearchParams({
                'username': username,
                'password': password,
            })
        });

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
               setFormdata({ email: '', password: '' }); // Reset form
            }else{
            const data = await response.json();
            const accessToken = {key:data.access_token};
            sessionStorage.setItem("accessToken", JSON.stringify(accessToken));
            navigate(deashBoardUrl, { replace: true });
            }


           
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your email"
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </div>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
export default LoginPage