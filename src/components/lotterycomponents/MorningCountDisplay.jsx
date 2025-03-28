// **Morning Count Display Component**
const MorningCountDisplay = ({ morningCounts, ticketOptions }) => (
    <div className="mt-4">
      <h4>Morning Count (Auto-Populated)</h4>
      {ticketOptions.map((option) => (
        <div key={option} className="mb-3 d-flex align-items-center">
          <span className="me-2">{option}</span>
          <input type="number" className="form-control" value={morningCounts[option] || 0} disabled style={{ backgroundColor: "#e9ecef", color: "#6c757d" }} />
        </div>
      ))}
    </div>
  );

  export default MorningCountDisplay;