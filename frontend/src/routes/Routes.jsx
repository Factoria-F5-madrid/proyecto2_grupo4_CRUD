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
