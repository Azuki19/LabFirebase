import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // Verificamos si hay datos del usuario en `localStorage`
  const savedUser = localStorage.getItem('user');

  // Si no hay datos del usuario, redirigimos al Login
  if (!savedUser) {
    return <Navigate to="/" replace />;
  }

  // Si hay datos del usuario, mostramos el componente hijo (Dashboard)
  return children;
};

export default PrivateRoute;
