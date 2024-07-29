import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../store/auth';

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  return user ? <>{ children }</> : <Navigate to="/login" />;
};

export default PrivateRoute;