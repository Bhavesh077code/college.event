
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/Register";
import AdminDashboard from "./admin/AdminDashboard"

const router = createBrowserRouter([
  { path: "/register", element: <Register /> },
  { path: "/admindashboard", element: <AdminDashboard /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

