import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const RequireAuth = ({ children, type }) => {
  const tokenRaw = localStorage.getItem('token');
  const location = useLocation();

  if (!tokenRaw) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  try {
    const token = JSON.parse(atob(tokenRaw.split('.')[1])); // dekodowanie payloadu JWT

    if (token.type !== type) {
      return <Navigate to="/" replace />;
    }

    return children;
  } catch (error) {
    console.error("Nieprawidłowy token:", error);
    return <Navigate to="/" replace />;
  }
};

export default RequireAuth;
