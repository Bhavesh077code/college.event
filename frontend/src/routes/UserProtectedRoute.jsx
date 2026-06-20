/*

import { Navigate } from "react-router-dom";

const SecretRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // ❌ Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Role based redirect (optional)
  if (role === "admin") {
    return children; // admin allowed
  }

  if (role === "user") {
    return children; // user allowed
  }

  // ❌ fallback
  return <Navigate to="/login" replace />;
};

export default SecretRoute;
*/


import { Navigate } from "react-router-dom";

const UserRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || role !== "user") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default UserRoute;