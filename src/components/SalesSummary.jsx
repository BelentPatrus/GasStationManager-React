import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableCell, TableBody } from "./ui/table/Table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SalesSummary = () => {
  const [date, setDate] = useState("");
  const [salesData, setSalesData] = useState(null);
  const [noData, setNoData] = useState(false);

  const fetchSalesData = async () => {
    if (!date) return;
    try {
      const response = await axios.get(`http://localhost:8080/consumer/${date}`);
      if (response.data && response.data.merchandiseItemSales.length > 0) {
        setSalesData(response.data);
        setNoData(false);
      } else {
        setSalesData(null);
        setNoData(true);
      }
    } catch (error) {
      console.error("Error fetching sales data:", error);
      setSalesData(null);
      setNoData(true);
    }
  };



  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title mb-4">Daily Sales Summary</h2>
          <input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            className="form-control mb-3"
          />
          <button className="btn btn-primary mb-3" onClick={fetchSalesData}>Fetch Sales</button>
          {noData && <p className="text-danger">No log for this date, contact administration.</p>}
          {salesData && (
            <div>
              <h3 className="mt-4">Total Sales: ${salesData.totalExtendedRetail.toFixed(2)}</h3>
              <h3>Total Items Sold: {salesData.totalQuantitySold}</h3>
              <div className="table-responsive mt-3">
                <table className="table table-bordered table-striped">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">Department</th>
                      <th scope="col">Product</th>
                      <th scope="col" className="text-center">Qty Sold</th>
                      <th scope="col" className="text-center">Unit Price</th>
                      <th scope="col" className="text-center">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salesData.merchandiseItemSales.map((item, index) => (
                      <tr key={index}>
                        <td>{item.department}</td>
                        <td>{item.description}</td>
                        <td className="text-center">{item.quantitySold}</td>
                        <td className="text-center">${item.unitRetail.toFixed(2)}</td>
                        <td className="text-center font-weight-bold">${item.extendedRetail.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default SalesSummary;
