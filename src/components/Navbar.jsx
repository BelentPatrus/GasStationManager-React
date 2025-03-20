import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">My App</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/sales-summary">Sales Summary</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/addCash">Add Cash Tracker</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/lottery">Lottery Tracker</Link>
            </li>
            {/*           <Route path="/uploadExcel" element={<UploadExcel />} /> */}
            <li className="nav-item">
              <Link className="nav-link" to="/uploadExcel">Upload Excel</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
