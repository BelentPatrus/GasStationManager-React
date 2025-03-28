// **Morning Count Input Component**
const MorningCountInput = ({ morningCounts, setMorningCounts, ticketOptions }) => {
    const handleChange = (option, value) => {
      setMorningCounts((prev) => ({ ...prev, [option]: value }));
    };
  
    return (
      <div className="mt-4">
        <h4>Enter Morning Count</h4>
        {ticketOptions.map((option) => (
          <div key={option} className="mb-3 d-flex align-items-center">
            <span className="me-2">{option}</span>
            <input
              type="number"
              className="form-control"
              value={morningCounts[option] || ""}
              onChange={(e) => handleChange(option, e.target.value)}
            />
          </div>
        ))}
      </div>
    );
  };

  export default MorningCountInput;