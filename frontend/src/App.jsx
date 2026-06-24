
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
import Feed from "./pages/Feed";
import Explore from "./pages/Explore";
import UserProfile from "./pages/UserProfile";
import CreatePost from "./pages/CreatePost";


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

  {
    path: "/feed",
    element: (
      <UserRoute> <Feed /> </UserRoute>
    ),
  },

  {
    path: "/explore",
    element: (
      <UserRoute> <Explore /> </UserRoute>
    ),
  },

  {
    path: "/create-post",
    element: (
      <UserRoute> <CreatePost /> </UserRoute>
    ),
  },

  {
    path: "/profile/:userId",
    element: (
      <UserRoute> <UserProfile /> </UserRoute>
    ),
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;