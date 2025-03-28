import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import SalesSummary from "./SalesSummary";
import AddCashTracker from "./AddCashTracker";
import UploadExcel from "./UploadExcel";
import LotteryInventoryTracker from "./LotteryInventoryTracker";
import LotteryInventoryTrackerSuccessPage from "./LotteryInventoryTrackerSuccessPage";

const App = () => {
  return (
    <>
      <Navbar /> {/* Persistent Navbar */}
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<SalesSummary />} />
          <Route path="/sales-summary" element={<SalesSummary />} />
          <Route path="/addCash" element={<AddCashTracker />} />
          <Route path="/uploadExcel" element={<UploadExcel />} />
          <Route path="/lottery" element={<LotteryInventoryTracker/>} />
          <Route path="/lottery/:date/success" element={<LotteryInventoryTrackerSuccessPage/>} />




        </Routes>
      </div>
    </>
  );
};

export default App;
