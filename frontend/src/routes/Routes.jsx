// routes/Routes.jsx
import { createBrowserRouter } from "react-router-dom";
import Spinner from "../pages/Spinner";
import Layout from "../layout/Layout";
import Home from "../pages/Home";
import ContactUs from "../pages/ContactUs";
import Reservations from "../pages/Reservations";
import Pets from "../pages/Pets";
import MedicalHistory from "../pages/MedicalHistory";
import Payments from "../pages/Payments";
import Invoice from "../pages/Invoice";
import Account from "../pages/Account";
import Settings from "../pages/Settings";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Users from "../pages/Users";
import Employees from "../pages/Employees";
import Services from "../pages/Services";


export const router = createBrowserRouter([
  {
    path: "/", 
    element: <Spinner />,
  },
  // Rutas de autenticación (sin layout)
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/", // rutas con layout (Nav + Footer)
    element: <Layout />,
    children: [
      {
        path: "home", // /home
        element: <Home />,
      },
      {
        path: "users", // /users
        element: <Users />,
      },
      {
        path: "employees", // /employees
        element: <Employees />,
      },
      {
        path: "contact", // /contact-us
        element: <ContactUs />,
      },
      {
        path: "reservations", // /reservations
        element: <Reservations />,
      },
      {
        path: "pets", // /pets
        element: <Pets />,
      },
      {
        path: "medicalhistory", // /medical-history
        element: <MedicalHistory />,
      },
      {
        path: "payments", // /payments
        element: <Payments />,
      },
      {
        path: "invoices", // /invoice
        element: <Invoice />,
      },
      {
        path: "services", // /services
        element: <Services />,
      },
      {
        path: "account", // /account
        element: <Account />,
      },
      {
        path: "settings", // /settings
        element: <Settings />,
      },
      // aqui se agregan mas rutas chicos :) 
    ],
  },
]);
