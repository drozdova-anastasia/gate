import React from 'react';
import { Route } from 'react-router-dom';

import './ProtectedRoute.css';

const ProtectedRoute = ({...props}) => {
  return (
    <Route {...props}/>
  );
};

export default ProtectedRoute;