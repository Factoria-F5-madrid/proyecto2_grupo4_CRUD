// routes/Routes.jsx
import { createBrowserRouter } from "react-router-dom";
import Spinner from "../pages/Spinner";
import Layout from "../layout/Layout";
import Home from "../pages/Home";

export const router = createBrowserRouter([
  {
    path: "/", 
    element: <Spinner />,
  },
  {
    path: "/", // rutas con layout (Nav + Footer)
    element: <Layout />,
    children: [
      {
        path: "home", // /home
        element: <Home />,
      },
      // aqui se agregan mas rutas chicos :) 
    ],
  },
]);
