import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Customers from "./pages/Customers/Customers";
// import CustomerList from "./pages/Customers/CustomerList";
import AddCustomer from "./pages/Customers/AddCustomerForm";
import CustomerDetails from "./pages/Customers/CustomerDetails";
import CustomerEdit from "./pages/Customers/CustomerEdit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Customers />} />
        <Route path="/add" element={<AddCustomer />} />
        <Route path="/customers/:id" element={<CustomerDetails />} />
        <Route path="/customers/:id/edit" element={<CustomerEdit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
