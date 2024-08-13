 import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./auth"; 
import { jwtDecode } from "jwt-decode"; 

// Function to validate the token
const validateToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch (error) {
    return false;
  }
};

const RequireAuth = ({ children, adminRequired }) => {
  const [auth, setAuth] = useAuth(); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = () => {
      const token = auth.token;
      if (token) {
        const isValid = validateToken(token); 
        if (!isValid) {
          setAuth({ user: null, token: "" }); 
          localStorage.removeItem("auth"); 
        }
      }
      setLoading(false);
    };

    checkAuthentication();
  }, [auth.token, setAuth]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  // Check if user is authenticated
  const isAuthenticated = auth.user !== null;

  // Check if admin access is required and if user is an administrator (role === 1)
  const isAdmin = adminRequired && isAuthenticated && auth.user.role === 1;

  return isAdmin || (!adminRequired && isAuthenticated) ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default RequireAuth;
