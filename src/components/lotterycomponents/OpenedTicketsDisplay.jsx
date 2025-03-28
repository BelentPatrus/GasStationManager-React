// **Opened Tickets Display Component**
const OpenedTicketsDisplay = ({ openedTickets, ticketOptions }) => (
    <div className="mt-4">
      <h4>Tickets Opened During Shift</h4>
      {ticketOptions.map((option) => (
        <div key={option} className="mb-3 d-flex align-items-center">
          <span className="me-2">{option}</span>
          <input type="number" className="form-control" value={openedTickets[option] || 0} disabled style={{ backgroundColor: "#e9ecef", color: "#6c757d" }} />
        </div>
      ))}
    </div>
  );

  export default OpenedTicketsDisplay;