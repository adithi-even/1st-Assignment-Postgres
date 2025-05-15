import React from "react";
import {Navigate, Outlet} from 'react-router-dom';

const  ProtectedRoute = ({allowedRoles}) => {
    const role = localStorage.getItem("role"); 
    console.log("ProtectedRoute - Stored Role:", role);
    console.log("Allowed Roles:", allowedRoles);

    if (!role) {
        console.warn("No role found, redirecting to home");
        return <Navigate to="/" replace />;
    }

    if (allowedRoles.includes(role)) {
        console.log("Access granted, rendering page...");
        return <Outlet />; 
    } else {
        console.warn("Role not authorized, redirecting to home");
        return <Navigate to="/" replace />;
  }
  
};

export default ProtectedRoute;

