import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Customers from "./pages/Customers/Customers";
import AddCustomer from "./pages/Customers/AddCustomerForm";
import CustomerDetails from "./pages/Customers/CustomerDetails";
import CustomerEdit from "./pages/Customers/CustomerEdit";

import Stored from "./pages/Stored/Stored";
import EditProducer from "./pages/Stored/EditProducer";
import AddProducerForm from "./pages/Stored/AddProducerForm";
import Home from "./pages/Home";
import Employees from "./pages/Employees/Employees";
import CreateEmployee from "./pages/Employees/CreateEmployee";
import UpdateEmployee from "./pages/Employees/UpdateEmployee";
import EmployeeDetails from "./pages/Employees/EmployeeDetails";
import Registering from "./pages/Auth/Registering";
import Login from "./pages/Auth/Login";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import RequireAuth from "./context/RequireAuth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Registering />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
        <Route
          path="/customer"
          element={
            <RequireAuth 
            adminRequired
            >
              <Customers />
            </RequireAuth>
          }
        />
        <Route
          path="/addCustomer"
          element={
            <RequireAuth adminRequired>
              <AddCustomer />
            </RequireAuth>
          }
        />
        <Route
          path="/customers/:id"
          element={
            <RequireAuth adminRequired>
              <CustomerDetails />
            </RequireAuth>
          }
        />
        <Route
          path="/customers/:id/edit"
          element={
            <RequireAuth adminRequired>
              <CustomerEdit />
            </RequireAuth>
          }
        />
        {/* <Route path="/customer" element={<Customers />} /> */}
        {/* <Route path="/addCustomer" element={<AddCustomer />} /> */}
        {/* <Route path="/customers/:id" element={<CustomerDetails />} /> */}
        {/* <Route path="/customers/:id/edit" element={<CustomerEdit />} /> */}
        <Route
          path="/stored"
          element={
            <RequireAuth adminRequired>
              <Stored />
            </RequireAuth>
          }
        />
        <Route
          path="/createProducer"
          element={
            <RequireAuth adminRequired>
              <AddProducerForm />
            </RequireAuth>
          }
        />
        <Route
          path="/editProducer/:id"
          element={
            <RequireAuth adminRequired>
              <EditProducer />
            </RequireAuth>
          }
        />
        {/* <Route path="/stored" element={<Stored />} /> */}
        {/* <Route path="/createProducer" element={<AddProducerForm />} /> */}
        {/* <Route path="/editProducer/:id" element={<EditProducer />} /> */}
        <Route
          path="/employees"
          element={
            <RequireAuth adminRequired>
              <Employees />
            </RequireAuth>
          }
        />
        <Route
          path="/createEmployees"
          element={
            <RequireAuth adminRequired>
              <CreateEmployee />
            </RequireAuth>
          }
        />
        <Route
          path="/updateEmployees/:id"
          element={
            <RequireAuth adminRequired>
              <UpdateEmployee />
            </RequireAuth>
          }
        />
        <Route
          path="/employeesDetails/:id"
          element={
            <RequireAuth adminRequired>
              <EmployeeDetails />
            </RequireAuth>
          }
        />
        {/* <Route path="/employees" element={<Employees />} /> */}
        {/* <Route path="/createEmployees" element={<CreateEmployee />} /> */}
        {/* <Route path="/updateEmployees/:id" element={<UpdateEmployee />} /> */}
        {/* <Route path="/employeesDetails/:id" element={<EmployeeDetails />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
