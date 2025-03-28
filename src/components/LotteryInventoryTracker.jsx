import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import MorningCountDisplay from "./lotterycomponents/MorningCountDisplay";
import OpenedTicketsDisplay from "./lotterycomponents/OpenedTicketsDisplay";
import MorningCountInput from "./lotterycomponents/MorningCountInput";
import OpenedTicketsInput from "./lotterycomponents/OpenedTicketsInput";

const ticketOptions = ["$2", "$3", "$5", "$10", "$20", "$30", "$50", "$100"];

const LotteryInventoryTracker = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [lotteryLogData, setLotteryData] = useState(null);
  const [morningCounts, setMorningCounts] = useState({});
  const [openedTickets, setOpenedTickets] = useState({});

  useEffect(() => {
    if (selectedDate) fetchSalesData();
  }, [selectedDate]);

  const fetchSalesData = async () => {
    if (!selectedDate) return;

    try {
      const { data } = await axios.get(`http://localhost:8080/lottery/log/${selectedDate}`);
      if (!data) return setLotteryData(null);

      setLotteryData(data);

      if (data.logComplete) {
        setMorningCounts({
          "$2": data.morningCount2, "$3": data.morningCount3,
          "$5": data.morningCount5, "$10": data.morningCount10,
          "$20": data.morningCount20, "$30": data.morningCount30,
          "$50": data.morningCount50, "$100": data.morningCount100,
        });

        setOpenedTickets({
          "$2": data.packsOpened2, "$3": data.packsOpened3,
          "$5": data.packsOpened5, "$10": data.packsOpened10,
          "$20": data.packsOpened20, "$30": data.packsOpened30,
          "$50": data.packsOpened50, "$100": data.packsOpened100,
        });
      } else {
        setMorningCounts({});
        setOpenedTickets({});
      }
    } catch (error) {
      console.error("Error fetching sales data:", error);
      setLotteryData(null);
      setMorningCounts({});
    }
  };

  const isLogComplete = () => lotteryLogData?.logComplete;

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-lg">
        <h2 className="mb-3">Lottery Inventory Tracker</h2>
        <div className="mb-3">
          <label className="form-label">Select Date:</label>
          <input type="date" className="form-control" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
        </div>

        {isLogComplete() ? (
          <>
            <MorningCountDisplay morningCounts={morningCounts} ticketOptions={ticketOptions}/>
            <OpenedTicketsDisplay openedTickets={openedTickets} ticketOptions={ticketOptions} />
          </>
        ) : (
          <>
            <MorningCountInput morningCounts={morningCounts} ticketOptions={ticketOptions} setMorningCounts={setMorningCounts} />
            <OpenedTicketsInput openedTickets={openedTickets} ticketOptions={ticketOptions} setOpenedTickets={setOpenedTickets} />
          </>
        )}

        <div className="d-flex justify-content-between mt-3">
          <button className="btn btn-primary">Submit</button>
        </div>
      </div>
    </div>
  );
};
export default LotteryInventoryTracker;
