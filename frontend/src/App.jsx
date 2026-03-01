/*
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Register from "./pages/Register";
import AdminDashboard from "./admin/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import Home from "./pages/Home";
import UploadEvent from "./admin/UploadEvent";
import Edit from "./admin/Edit";
import Login from "./pages/Login";



const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },

  {
    path: "/admindashboard",
    element:
      <AdminDashboard />
  },

  {
    path: "/userdashboard",
    element:
      
        <UserDashboard />
  
  },

  {
    path: "/upload",
    element:
      <UploadEvent />
  },

  {
    path: "/edit/:id",
    element:
      <Edit />
  },

]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
*/


import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Register from "./pages/Register";
import AdminDashboard from "./admin/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import Home from "./pages/Home";
import UploadEvent from "./admin/UploadEvent";
import Edit from "./admin/Edit";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/AdminRoute";


const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },

  {
    path: "/admindashboard",
    element: (
        <AdminDashboard />
    ),
  },

  {
    path: "/userdashboard",
    element: (
      <ProtectedRoute role="user">
        <UserDashboard />
    </ProtectedRoute>
    ),
  },

  {
    path: "/upload",
    element: (
        <UploadEvent />
    ),
  },

  {
    path: "/edit/:id",
    element: (
        <Edit />
    ),
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;