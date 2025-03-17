import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const DailyCashTrackerForm = () => {
  const [formData, setFormData] = useState({
    date: "",
    morningSetCashAmount: "",
    recordedNumberOfSafeDrops: "",
    actualNumberOfSafeDrops: "",
    recordedSafeDropAmount: "",
    actualSafeDropAmount: "",
    recordedCashOnHand: "",
    actualCashOnHand: "",
  });

  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fields = [
    { key: "date", label: "Input Date", type: "date" },
    { key: "morningSetCashAmount", label: "Input Morning Cash Amount", type: "number" },
    { key: "recordedNumberOfSafeDrops", label: "Recorded Number of Safe Drops", type: "number" },
    { key: "actualNumberOfSafeDrops", label: "Actual Number of Safe Drops", type: "number" },
    { key: "recordedSafeDropAmount", label: "Recorded Safe Drop Amount", type: "number" },
    { key: "actualSafeDropAmount", label: "Actual Safe Drop Amount", type: "number" },
    { key: "recordedCashOnHand", label: "Recorded Cash On Hand", type: "number" },
    { key: "actualCashOnHand", label: "Actual Cash On Hand", type: "number" },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [fields[step].key]: e.target.value });
  };

  const nextStep = () => {
    if (step < fields.length - 1) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await axios.post(`http://localhost:8080/cash/${formData.date}`, formData);
      if (response.data) {
        setSuccessMessage("Daily Cash Tracker saved successfully!");
        setFormData({
          date: "",
          morningSetCashAmount: "",
          recordedNumberOfSafeDrops: "",
          actualNumberOfSafeDrops: "",
          recordedSafeDropAmount: "",
          actualSafeDropAmount: "",
          recordedCashOnHand: "",
          actualCashOnHand: "",
        });
        setStep(0);
      } else {
        setErrorMessage("Failed to save data. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Error submitting data: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-lg">
        <h2 className="mb-3">Daily Cash Tracker</h2>

        {/* Show previously entered values */}
        <div className="mb-4">
          {fields.slice(0, step).map((field, index) => (
            <div key={index} className="alert alert-secondary">
              <strong>{field.label}:</strong> {formData[field.key]}
            </div>
          ))}
        </div>

        {/* Input Field */}
        <div className="mb-3">
          <label className="form-label">{fields[step].label}</label>
          <input
            type={fields[step].type}
            className="form-control"
            value={formData[fields[step].key]}
            onChange={handleChange}
          />
        </div>

        {/* Navigation Buttons */}
        <div className="d-flex justify-content-between">
          <button className="btn btn-secondary" onClick={prevStep} disabled={step === 0}>
            Back
          </button>

          {step < fields.length - 1 ? (
            <button className="btn btn-primary" onClick={nextStep}>
              Next
            </button>
          ) : (
            <button className="btn btn-success" onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          )}
        </div>

        {/* Success/Error Messages */}
        {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
        {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
      </div>
    </div>
  );
};

export default DailyCashTrackerForm;
