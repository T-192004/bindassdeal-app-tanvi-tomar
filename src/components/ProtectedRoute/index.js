// ProtectedRoute.js
import React from 'react';
import Cookies from 'js-cookie';
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoute = () => {
  const token = Cookies.get('jwt_token');
  console.log(token);
  const isAuthenticated = token !== undefined ? true: false;
  return (
    isAuthenticated ? <Outlet /> : <Navigate to="/login"/>
  );
};

export default ProtectedRoute;
