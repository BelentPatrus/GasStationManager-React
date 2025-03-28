import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const LotteryInventoryTrackerSuccessPage = () => {
  const { date } = useParams(); // Extract the date from the URL
  const [lotteryReportData, setLotteryReportData] = useState(null);

  useEffect(() => {
    console.log("Fetching data for date:", date);
    if (!date) return;

    fetchSalesData();
  }, [date]);

  const fetchSalesData = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/lottery/report/${date}`);
      console.log("Fetched Data:", data);
      setLotteryReportData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-lg text-center">
        <h2>🎉 Submission Successful!</h2>
        <p>Lottery data for <strong>{date}</strong> has been saved.</p>

        {/* Show table only if data exists */}
        {lotteryReportData ? (
          <div className="table-responsive mt-4">
            <table className="table table-bordered table-striped">
              <thead className="thead-dark">
                <tr>
                  <th>Denomination</th>
                  <th>Yesterday's Morning Count</th>
                  <th>Yesterday's Reported Sales</th>
                  <th>Today's Morning Count</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(lotteryReportData.yesterdayMorningCounts).map((denomination) => (
                  <tr key={denomination}>
                    <td>{denomination}</td>
                    <td>{lotteryReportData.yesterdayMorningCounts[denomination] || 0}</td>
                    <td>{lotteryReportData.yesterdayReportedSales?.[denomination] || 0}</td>
                    <td>{lotteryReportData.todayMorningCounts[denomination] || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="mt-3 text-danger">No data available for this date.</p>
        )}

        <Link to="/" className="btn btn-primary mt-3">
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default LotteryInventoryTrackerSuccessPage;
