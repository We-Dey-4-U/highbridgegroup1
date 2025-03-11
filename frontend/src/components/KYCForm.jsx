import React, { useState } from "react";
import axios from "axios";

const KYCForm = ({ onKycUpdate }) => {
  const [kycData, setKYCData] = useState({
    residentialAddress: "",
    dateOfBirth: "",
    nationality: "",
    maritalStatus: "",
    occupation: "",
    placeOfWork: "",
    workAddress: "",
    idDocumentType: "",
    nextOfKin: {
      name: "",
      phone: "",
      relationship: "",
      address: "",
    },
    bankDetails: {
      bankName: "",
      accountNumber: "",
      accountName: "",
    },
    corporateInfo: {
      corporateName: "",
      corporateAddress: "",
      contactName: "",
      correspondenceAddress: "",
      corporatePhone: "",
      corporateEmail: "",
    },
  });

  const [idFile, setIdFile] = useState(null);
  const [passportFile, setPassportFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false); // New state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setKYCData((prev) => {
      const keys = name.split(".");
      if (keys.length === 2) {
        return {
          ...prev,
          [keys[0]]: {
            ...prev[keys[0]],
            [keys[1]]: value,
          },
        };
      } else {
        return { ...prev, [name]: value };
      }
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "idDocumentImage") {
      setIdFile(files[0]);
    } else if (name === "passportImage") {
      setPassportFile(files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("residentialAddress", kycData.residentialAddress);
    formData.append("dateOfBirth", kycData.dateOfBirth);
    formData.append("nationality", kycData.nationality);
    formData.append("maritalStatus", kycData.maritalStatus);
    formData.append("occupation", kycData.occupation);
    formData.append("idDocumentType", kycData.idDocumentType);
    formData.append("placeOfWork", kycData.placeOfWork);
    formData.append("workAddress", kycData.workAddress);
    formData.append("nextOfKin", JSON.stringify(kycData.nextOfKin));
    formData.append("bankDetails", JSON.stringify(kycData.bankDetails));
    formData.append("corporateInfo", JSON.stringify(kycData.corporateInfo));

    if (idFile) {
      formData.append("idDocumentImage", idFile);
    }

    if (passportFile) {
      formData.append("passportImage", passportFile);
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://highbridge-api-15.onrender.com/api/auth/update-kyc",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("KYC Submitted Successfully!");
      onKycUpdate();
    } catch (error) {
      alert("KYC Submission Failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "500px",
        margin: "auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        background: "#000",
        color: "#fff",
        maxHeight: "80vh",
        overflowY: "auto",
      }}
    >
      <h2 style={{ textAlign: "center" }}>IoT-Enabled KYC Form</h2>

      <h3 style={{ color: "white" }}>Personal Information</h3>
      {["residentialAddress", "dateOfBirth", "nationality", "maritalStatus", "occupation", "placeOfWork", "workAddress"].map((key) => (
        <div key={key} style={{ marginBottom: "15px" }}>
          <label>{key.replace(/([A-Z])/g, " $1").trim()}</label>
          <input type="text" name={key} value={kycData[key]} onChange={handleChange} required />
        </div>
      ))}

      <h3 style={{ color: "white" }}>Next of Kin</h3>
      {Object.keys(kycData.nextOfKin).map((subKey) => (
        <div key={`nextOfKin.${subKey}`} style={{ marginBottom: "15px" }}>
          <label>{subKey.replace(/([A-Z])/g, " $1").trim()}</label>
          <input type="text" name={`nextOfKin.${subKey}`} value={kycData.nextOfKin[subKey]} onChange={handleChange} required />
        </div>
      ))}

      <h3 style={{ color: "white" }}>Bank Details</h3>
      {Object.keys(kycData.bankDetails).map((subKey) => (
        <div key={`bankDetails.${subKey}`} style={{ marginBottom: "15px" }}>
          <label>{subKey.replace(/([A-Z])/g, " $1").trim()}</label>
          <input type="text" name={`bankDetails.${subKey}`} value={kycData.bankDetails[subKey]} onChange={handleChange} required />
        </div>
      ))}

      <h3 style={{ color: "white" }}>Corporate Information</h3>
      {Object.keys(kycData.corporateInfo).map((subKey) => (
        <div key={`corporateInfo.${subKey}`} style={{ marginBottom: "15px" }}>
          <label>{subKey.replace(/([A-Z])/g, " $1").trim()}</label>
          <input type="text" name={`corporateInfo.${subKey}`} value={kycData.corporateInfo[subKey]} onChange={handleChange} />
        </div>
      ))}

      <div style={{ marginBottom: "15px" }}>
        <label>ID Document Type</label>
        <select name="idDocumentType" value={kycData.idDocumentType} onChange={handleChange} required>
          <option value="">Select Document Type</option>
          <option value="passport">Passport</option>
          <option value="driver_license">Driver's License</option>
          <option value="national_id">National ID</option>
        </select>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>Upload ID Document</label>
        <input type="file" name="idDocumentImage" onChange={handleFileChange} required />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>Upload Passport Image</label>
        <input type="file" name="passportImage" onChange={handleFileChange} required />
      </div>

      {/* Terms and Conditions */}
      <div style={{ margin: "15px 0" }}>
        <input
          type="checkbox"
          id="terms"
          checked={agreedToTerms}
          onChange={() => setAgreedToTerms(!agreedToTerms)}
          required
        />
        <label htmlFor="terms" style={{ marginLeft: "8px" }}>
          I agree to the <a href="/terms" target="_blank" style={{ color: "#007bff" }}>Terms and Conditions</a>
        </label>
      </div>

      <button
        type="submit"
        disabled={!agreedToTerms || loading}
        style={{
          width: "100%",
          padding: "10px",
          background: agreedToTerms ? "#007bff" : "#555",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: agreedToTerms ? "pointer" : "not-allowed",
        }}
      >
        {loading ? "Submitting..." : "Submit KYC"}
      </button>
    </form>
  );
};

export default KYCForm;
