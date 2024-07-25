import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Customers from "./pages/Customers/Customers";
import AddCustomer from "./pages/Customers/AddCustomerForm";
import CustomerDetails from "./pages/Customers/CustomerDetails";
import CustomerEdit from "./pages/Customers/CustomerEdit";

import Stored from "./pages/Stored/Stored";
import EditProducer from "./pages/Stored/EditProducer";
import AddProducerForm from "./pages/Stored/AddProducerForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Customers />} />

        <Route path="/addCustomer" element={<AddCustomer />} />
        <Route path="/customers/:id" element={<CustomerDetails />} />
        <Route path="/customers/:id/edit" element={<CustomerEdit />} />

        <Route path="/stored" element={<Stored />} />
        <Route path="/createProducer" element={<AddProducerForm />} />
        <Route path="/editProducer/:id" element={<EditProducer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
