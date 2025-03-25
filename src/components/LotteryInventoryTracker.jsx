import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const LotteryInventoryTracker = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [lotteryLogData, setLotteryData] = useState(null);
  const [entryType, setEntryType] = useState(""); // "Morning" or "EOD"
  const [tickets, setTickets] = useState([]);
  const [openedTickets, setOpenedTickets] = useState([]);
  const [morningCounts, setMorningCounts] = useState({});
  
  const ticketOptions = ["$2", "$3", "$5", "$10", "$20", "$30", "$50", "$100"];

  // Fetch data when selectedDate changes
  useEffect(() => {
    if (selectedDate) {
      fetchSalesData();
    }
  }, [selectedDate]);

  const fetchSalesData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/lottery/log/${selectedDate}`);
      if (response.data) {
        setLotteryData(response.data);
        console.log("Fetched lottery data:", response.data);
        
        // **🔴 Auto-populate morning counts if morningLogComplete is true 🔴**
        if (response.data.morningLogComplete) {
          setMorningCounts({
            "$2": response.data.morningCount2,
            "$3": response.data.morningCount3,
            "$5": response.data.morningCount5,
            "$10": response.data.morningCount10,
            "$20": response.data.morningCount20,
            "$30": response.data.morningCount30,
            "$50": response.data.morningCount50,
            "$100": response.data.morningCount100,
          });
        } else {
          setMorningCounts({});
        }
        
      } else {
        setLotteryData(null);
        setMorningCounts({});
      }
    } catch (error) {
      console.error("Error fetching sales data:", error);
      setLotteryData(null);
      setMorningCounts({});
    }
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleAddOpenedTicket = () => {
    setOpenedTickets([...openedTickets, { type: "", count: "" }]);
  };

  const handleOpenedTicketChange = (index, key, value) => {
    const newOpenedTickets = [...openedTickets];
    newOpenedTickets[index][key] = value;
    setOpenedTickets(newOpenedTickets);
  };

  const handleSubmit = () => {
    if (!selectedDate) {
      alert("Please select a date.");
      return;
    }

    console.log("Submitting Data:", { selectedDate, tickets, openedTickets });
    // Send data to backend
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-lg">
        <h2 className="mb-3">Lottery Inventory Tracker</h2>
        <div className="mb-3">
          <label className="form-label">Select Date:</label>
          <input type="date" className="form-control" value={selectedDate} onChange={handleDateChange} />
        </div>

        {/* 🔴 Morning Count Display 🔴 */}
        {lotteryLogData?.morningLogComplete && (
          <div className="mt-4">
            <h4>Morning Count (Auto-Populated)</h4>
            {ticketOptions.map((option) => (
              <div key={option} className="mb-3 d-flex align-items-center">
                <span className="me-2">{option}</span>
                <input
                  type="number"
                  className="form-control"
                  value={morningCounts[option] || 0}
                  disabled
                  style={{ backgroundColor: "#e9ecef", color: "#6c757d" }}
                />
              </div>
            ))}
          </div>
        )}

        {/* 🔴 EOD and Opened Ticket Entry 🔴 */}
        <div className="mt-4">
          <h4>Tickets Opened During Shift</h4>
          {openedTickets.map((ticket, index) => (
            <div key={index} className="mb-3 d-flex align-items-center">
              <select
                className="form-control me-2"
                value={ticket.type}
                onChange={(e) => handleOpenedTicketChange(index, "type", e.target.value)}
              >
                <option value="">Select Ticket Type</option>
                {ticketOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              <input
                type="number"
                className="form-control"
                placeholder="Count"
                value={ticket.count}
                onChange={(e) => handleOpenedTicketChange(index, "count", e.target.value)}
              />
            </div>
          ))}
          <div className="d-flex justify-content-between mt-3">
            <button className="btn btn-warning" onClick={handleAddOpenedTicket}>Log Opened Ticket</button>
          </div>
        </div>

        <div className="d-flex justify-content-between mt-3">
          <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default LotteryInventoryTracker;
