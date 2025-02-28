import React from "react";
import {Navigate, Outlet} from 'react-router-dom';

const  ProtectedRoute = ({allowedRoles}) => {
    const role = localStorage.getItem("role"); //Get stored role from the local storage
    console.log("ProtectedRoute - Stored Role:", role);
    console.log("Allowed Roles:", allowedRoles);

    // Fix: Ensure role exists before checking
    if (!role) {
        console.warn("No role found, redirecting to home");
        return <Navigate to="/" replace />;
    }

    // Fix: Ensure allowedRoles is an array and check correctly
    if (allowedRoles.includes(role)) {
        console.log("Access granted, rendering page...");
        return <Outlet />; //Outlet:Explained below
    } else {
        console.warn("Role not authorized, redirecting to home");
        return <Navigate to="/" replace />;
  }
  
};

export default ProtectedRoute;

//The Outlet component in React Router is a special component that renders the content of a route.
// It's typically used in a layout component to render the main content of a page.
// When a route is matched, the Outlet component is replaced with the content of that route.