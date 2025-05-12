
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {

  const savedUser = localStorage.getItem('user');


  if (!savedUser) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
