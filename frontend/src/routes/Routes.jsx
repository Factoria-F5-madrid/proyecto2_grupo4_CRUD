// routes/Routes.jsx
import { createBrowserRouter } from "react-router-dom";
import Spinner from "../pages/Spinner";
import Layout from "../layout/Layout";
import Home from "../pages/Home";
import ContactUs from "../pages/ContactUs";
import Reservations from "../pages/Reservations";
import ReservationDetail from "../pages/ReservationDetail";
import ReservationEdit from "../pages/ReservationEdit";
import InvoiceDetail from "../pages/InvoiceDetail";
import InvoiceEdit from "../pages/InvoiceEdit";
import InvoiceCreate from "../pages/InvoiceCreate";
import ServiceDetail from "../pages/ServiceDetail";
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
import ServiceEdit from "../pages/ServiceEdit";
import PaymentCreate from "../pages/PaymentCreate";
import MyReservations from "../pages/MyReservations";


export const router = createBrowserRouter([
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
        path: "", // / (página principal)
        element: <Home />,
      },
      {
        path: "home", // /home (redirección)
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
        path: "reservations/:reservationId", // /reservations/:id
        element: <ReservationDetail />,
      },
      {
        path: "reservations/:reservationId/edit", // /reservations/:id/edit
        element: <ReservationEdit />,
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
        path: "payments/new", // /payments/new
        element: <PaymentCreate />,
      },
      {
        path: "invoices", // /invoice
        element: <Invoice />,
      },
      {
        path: "invoices/new", // /invoices/new
        element: <InvoiceCreate />,
      },
      {
        path: "invoices/:invoiceId", // /invoices/:id
        element: <InvoiceDetail />,
      },
      {
        path: "invoices/:invoiceId/edit", // /invoices/:id/edit
        element: <InvoiceEdit />,
      },
      {
        path: "services", // /services
        element: <Services />,
      },
      {
        path: "services/:serviceId", // /services/:id
        element: <ServiceDetail />,
      },
      {
        path: "services/:serviceId/edit", // /services/:id/edit
        element: <ServiceEdit />,
      },
      {
        path: "account", // /account
        element: <Account />,
      },
      {
        path: "settings", // /settings
        element: <Settings />,
      },
      {
        path: "my-reservations", // /my-reservations
        element: <MyReservations />,
      },
      // aqui se agregan mas rutas chicos :) 
    ],
  },
]);
