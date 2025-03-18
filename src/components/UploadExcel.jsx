import React, { useState } from "react";
import axios from "axios";

const UploadExcel = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:8080/api/upload-excel", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setUploadStatus("File uploaded successfully!");
      } else {
        setUploadStatus("Upload failed. Try again.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus("Error uploading file.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-lg">
        <h2 className="mb-3">Upload Excel File</h2>
        <input type="file" accept=".xls,.xlsx" onChange={handleFileChange} className="form-control mb-3" />
        <button className="btn btn-primary" onClick={handleUpload}>
          Upload
        </button>
        {uploadStatus && <p className="mt-3">{uploadStatus}</p>}
      </div>
    </div>
  );
};

export default UploadExcel;
