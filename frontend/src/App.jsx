
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import UserRoute from "./routes/UserProtectedRoute";
import Feed from "./pages/Feed";
import Explore from "./pages/Explore";
import UserProfile from "./pages/UserProfile";
import CreatePost from "./pages/CreatePost";
import Notification from "./pages/Notification";


const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },

  {
    path: "/feed",
    element: (
      <UserRoute> <Feed /> </UserRoute>
    ),
  },

  {
    path: "/notifications",
    element: (
      <UserRoute> <Notification /> </UserRoute>
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