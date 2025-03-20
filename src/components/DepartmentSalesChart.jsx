import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

// Register required chart.js components
Chart.register(ArcElement, Tooltip, Legend);

const DepartmentSalesChart = ({ departmentSales }) => {
  if (!departmentSales || Object.keys(departmentSales).length === 0) {
    return;
  }

  const labels = Object.keys(departmentSales);
  const dataValues = Object.values(departmentSales);

  // Calculate total sales for percentage calculation
  const totalSales = dataValues.reduce((acc, val) => acc + val, 0);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Sales Percentage",
        data: dataValues,
        backgroundColor: [
          "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", 
          "#FF9F40", "#C9CBCF", "#FF6384", "#36A2EB"
        ],
        hoverBackgroundColor: [
          "#FF4364", "#2592DB", "#E6BE36", "#3AAFA0", "#804CCF",
          "#E68F30", "#B8BABC", "#FF4364", "#2592DB"
        ],
      },
    ],
  };

   // Customize tooltips to show percentages instead of raw numbers
   const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            let value = tooltipItem.raw; // Raw sales value
            let percentage = ((value / totalSales) * 100).toFixed(2); // Convert to percentage
            return `${tooltipItem.label}: ${percentage}% (${value})`; // Show both
          },
        },
      },
      legend: {
        position: "bottom", // Move legend to bottom
      },
    },
  };

  return (
    <div className="card mt-4 p-3 shadow">
      <h5 className="text-center">Department Sales Breakdown</h5>
      <div style={{ width: "400px", height: "400px", margin: "0 auto" }}>
        <Pie data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default DepartmentSalesChart;
