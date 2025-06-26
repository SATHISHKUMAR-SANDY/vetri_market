import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import CustomerDetailForm from "./pages/CustomerDetailForm";
import Endpage from "./pages/Endpage";
import Home from "./pages/Home";
import Invoice from "./pages/invoice";
import Paymentpage from "./pages/Paymentpage";
import Placeorder from "./pages/Placeorder";
import Productpage from "./pages/Productpage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Step 1: Render CustomerDetailForm first */}
        <Route path="/" element={<CustomerDetailForm />} />
        <Route path="/customerdetail" element={<CustomerDetailForm />} />
        {/* Step 2: Sidebar with nested routes */}
        <Route path="/sidebar" element={<Sidebar />}>
          {/* Default route inside sidebar goes to /sidebar/home */}
          <Route index element={<Navigate to="/sidebar/home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="product" element={<Productpage />} />

          <Route path="payment" element={<Paymentpage></Paymentpage>}></Route>
        </Route>
        <Route path="/order" element={<Placeorder></Placeorder>}></Route>

        <Route path="/invoice" element={<Invoice></Invoice>} ></Route>
        <Route  path="/thank" element={<Endpage></Endpage>}></Route>
      </Routes>
    </BrowserRouter>
  );
}
