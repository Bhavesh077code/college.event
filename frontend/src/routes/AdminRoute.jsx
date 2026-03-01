import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!token || !storedUser) {
        return <Navigate to="/login" />;
    }

    const user = JSON.parse(storedUser);


    return children;
};

export default ProtectedRoute;