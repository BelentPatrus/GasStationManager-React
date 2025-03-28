// **Opened Tickets Input Component**
const OpenedTicketsInput = ({ openedTickets, setOpenedTickets, ticketOptions }) => {
    const handleChange = (option, value) => {
      setOpenedTickets((prev) => ({ ...prev, [option]: value }));
    };
  
    return (
      <div className="mt-4">
        <h4>Log Tickets Opened During Shift</h4>
        {ticketOptions.map((option) => (
          <div key={option} className="mb-3 d-flex align-items-center">
            <span className="me-2">{option}</span>
            <input
              type="number"
              className="form-control"
              value={openedTickets[option] || ""}
              onChange={(e) => handleChange(option, e.target.value)}
            />
          </div>
        ))}
      </div>
    );
  };

  export default OpenedTicketsInput;