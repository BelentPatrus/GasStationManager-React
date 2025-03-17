import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import SalesSummary from "./SalesSummary";
import AddCashTracker from "./AddCashTracker";

const App = () => {
  return (
    <>
      <Navbar /> {/* Persistent Navbar */}
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<SalesSummary />} />
          <Route path="/sales-summary" element={<SalesSummary />} />
          <Route path="/addCash" element={<AddCashTracker />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
