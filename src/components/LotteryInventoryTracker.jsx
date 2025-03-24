import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const LotteryInventoryTracker = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [lotteryLogData, setLotteryData] = useState(null);
  const [entryType, setEntryType] = useState(""); // "Morning" or "EOD"
  const [tickets, setTickets] = useState([]);
  const [openedTickets, setOpenedTickets] = useState([]);
  const [previousEntryExists, setPreviousEntryExists] = useState(false);
  
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
        
      } else {
        setLotteryData(null);
      }
    } catch (error) {
      console.error("Error fetching sales data:", error);
      setLotteryData(null);
    }
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleEntryTypeChange = (e) => {
    setEntryType(e.target.value);
  };

  const handleAddTicket = () => {
    setTickets([...tickets, { type: "", count: "" }]);
  };

  const handleAddOpenedTicket = () => {
    setOpenedTickets([...openedTickets, { type: "", count: "" }]);
  };

  const handleTicketChange = (index, key, value) => {
    const newTickets = [...tickets];
    newTickets[index][key] = value;
    setTickets(newTickets);
  };

  const handleOpenedTicketChange = (index, key, value) => {
    const newOpenedTickets = [...openedTickets];
    newOpenedTickets[index][key] = value;
    setOpenedTickets(newOpenedTickets);
  };

  const handleSubmit = () => {
    if (!selectedDate || !entryType) {
      alert("Please select a date and entry type.");
      return;
    }

    if (!previousEntryExists) {
      alert("Warning: The previous day's EOD count is missing!");
    }

    console.log("Submitting Data:", { selectedDate, entryType, tickets, openedTickets });
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
        {/* <div className="mb-3">
          <label className="form-label">Is this a Morning or EOD Count?</label>
          <select className="form-control" value={entryType} onChange={handleEntryTypeChange}>
            <option value="">Select...</option>
            <option value="Morning">Morning Count</option>
            <option value="EOD">End of Day Count</option>
          </select>
        </div> */}

        {tickets.map((ticket, index) => (
          <div key={index} className="mb-3 d-flex align-items-center">
            <select
              className="form-control me-2"
              value={ticket.type}
              onChange={(e) => handleTicketChange(index, "type", e.target.value)}
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
              onChange={(e) => handleTicketChange(index, "count", e.target.value)}
            />
          </div>
        ))}

        <div className="d-flex justify-content-between mt-3">
          <button className="btn btn-secondary" onClick={handleAddTicket}>Add Ticket</button>
        </div>

        {entryType === "EOD" && (
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
        )}

        <div className="d-flex justify-content-between mt-3">
          <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default LotteryInventoryTracker;
