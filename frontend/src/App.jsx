
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Register from "./pages/Register";
import AdminDashboard from "./admin/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import Home from "./pages/Home";
import UploadEvent from "./admin/UploadEvent";
import Edit from "./admin/Edit";
import Login from "./pages/Login";
import AdminRoute from "./routes/AdminProtectedRoute";
import UserRoute from "./routes/UserProtectedRoute";


const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },

  {
    path: "/admindashboard",
    element: (
            <AdminRoute> <AdminDashboard /> </AdminRoute>
    ),
  },

  {
    path: "/userdashboard",
    element: (
        <UserRoute> <UserDashboard /> </UserRoute>
    ),
  },

  {
    path: "/upload",
    element: (
      <AdminRoute> <UploadEvent /> </AdminRoute>
    ),
  },

  {
    path: "/edit/:id",
    element: (
      <AdminRoute> <Edit /> </AdminRoute>
    )
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;