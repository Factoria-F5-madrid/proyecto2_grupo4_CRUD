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
  
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/", 
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "home", 
        element: <Home />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "employees",
        element: <Employees />,
      },
      {
        path: "contact", 
        element: <ContactUs />,
      },
      {
        path: "reservations", 
        element: <Reservations />,
      },
      {
        path: "reservations/:reservationId", 
        element: <ReservationDetail />,
      },
      {
        path: "reservations/:reservationId/edit",
        element: <ReservationEdit />,
      },
      {
        path: "pets", 
        element: <Pets />,
      },
      {
        path: "medicalhistory", 
        element: <MedicalHistory />,
      },
      {
        path: "payments", 
        element: <Payments />,
      },
      {
        path: "payments/new",
        element: <PaymentCreate />,
      },
      {
        path: "invoices",
        element: <Invoice />,
      },
      {
        path: "invoices/new", 
        element: <InvoiceCreate />,
      },
      {
        path: "invoices/:invoiceId", 
        element: <InvoiceDetail />,
      },
      {
        path: "invoices/:invoiceId/edit", 
        element: <InvoiceEdit />,
      },
      {
        path: "services",
        element: <Services />,
      },
      {
        path: "services/:serviceId", 
        element: <ServiceDetail />,
      },
      {
        path: "services/:serviceId/edit", 
        element: <ServiceEdit />,
      },
      {
        path: "account", 
        element: <Account />,
      },
      {
        path: "settings", 
        element: <Settings />,
      },
      {
        path: "my-reservations", 
        element: <MyReservations />,
      },
      
    ],
  },
]);
