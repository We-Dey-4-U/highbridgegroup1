import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./CreateStaffReport.css";

const CreateStaffReport = () => {
  const [staffReport, setStaffReport] = useState({
    name: "",
    date: "",
    branch: "",
    email: "",
    mobileNumber: "",
    privateNote: "",
    timeIn: "",
    timeOut: "",
  });

  const [isTimeOutEditable, setIsTimeOutEditable] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const today = new Date();
    const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;

    const updateTimeIn = () => {
      const now = new Date();
      const nigeriaOffset = 1 * 60;
      const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
      const nigeriaTime = new Date(utcTime + nigeriaOffset * 60000);

      const hours = String(nigeriaTime.getHours()).padStart(2, "0");
      const minutes = String(nigeriaTime.getMinutes()).padStart(2, "0");
      const formattedTime = `${hours}:${minutes}`;

      setStaffReport((prev) => ({
        ...prev,
        date: formattedDate,
        timeIn: formattedTime,
      }));
    };

    updateTimeIn();
    if (today.getHours() >= 18) {
      setIsTimeOutEditable(true);
    }
  }, []);

  // 🎥 Open Camera
  const openCamera = async () => {
    setIsCameraOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      alert("Error accessing camera: " + error.message);
      setIsCameraOpen(false);
    }
  };

  // 📸 Capture Image
  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageDataUrl = canvas.toDataURL("image/png");
      setCapturedImage(imageDataUrl);
      setIsCameraOpen(false);

      // Convert to File object
      fetch(imageDataUrl)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], "captured-image.png", { type: "image/png" });
          setImageFile(file);
        });

      // Stop camera stream
      if (video.srcObject) {
        video.srcObject.getTracks().forEach((track) => track.stop());
      }
    }
  };

  // 📨 Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      alert("Please capture an image before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("name", staffReport.name);
    formData.append("date", staffReport.date);
    formData.append("branch", staffReport.branch);
    formData.append("email", staffReport.email);
    formData.append("mobileNumber", staffReport.mobileNumber);
    formData.append("privateNote", staffReport.privateNote);
    formData.append("timeIn", staffReport.timeIn);
    formData.append("timeOut", staffReport.timeOut);
    formData.append("image", imageFile);

    try {
      const response = await axios.post("http://localhost:5000/api/staff-reports/staff-reports", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(response.data.message || "Staff report submitted successfully!");
      setCapturedImage(null);
      setImageFile(null);

      setStaffReport((prev) => ({
        name: "",
        date: prev.date,
        branch: "",
        email: "",
        mobileNumber: "",
        privateNote: "",
        timeIn: prev.timeIn,
        timeOut: "",
      }));
    } catch (error) {
      console.error("Error submitting staff report:", error);
      alert(`Error: ${error.response?.data?.message || "An error occurred"}`);
    }
  };

  return (
    <div className="create-staff-report-container">
      <img src="/assets/images/logo/highbridge2.png" alt="Highbridge Homes Logo" />
      <h2 style={{ color: "#ffffff" }}>Staff Attendance Report</h2>

      <form onSubmit={handleSubmit} className="staff-report-form">
        <label>
          Staff Name:
          <input type="text" name="name" value={staffReport.name} onChange={(e) => setStaffReport({ ...staffReport, name: e.target.value })} required />
        </label>

        <label>
          Date:
          <input type="text" name="date" value={staffReport.date} readOnly />
        </label>

        <label>
          Branch:
          <input type="text" name="branch" value={staffReport.branch} onChange={(e) => setStaffReport({ ...staffReport, branch: e.target.value })} required />
        </label>

        <label>
          Email:
          <input type="email" name="email" value={staffReport.email} onChange={(e) => setStaffReport({ ...staffReport, email: e.target.value })} required />
        </label>

        <label>
          Mobile Number:
          <input type="text" name="mobileNumber" value={staffReport.mobileNumber} onChange={(e) => setStaffReport({ ...staffReport, mobileNumber: e.target.value })} required />
        </label>

        <label>
          Private Note:
          <textarea name="privateNote" value={staffReport.privateNote} onChange={(e) => setStaffReport({ ...staffReport, privateNote: e.target.value })} />
        </label>

        {/* 📸 Camera Capture Section */}
        <div className="camera-container">
          {!capturedImage ? (
            <button type="button" onClick={openCamera} className="capture-btn">
              Open Camera
            </button>
          ) : (
            <img src={capturedImage} alt="Captured" className="captured-image" />
          )}
        </div>

        {/* Camera & Capture Controls */}
        {isCameraOpen && (
          <div className="camera-popup">
            <video ref={videoRef} autoPlay className="camera-feed"></video>
            <button type="button" onClick={captureImage} className="capture-btn">
              Capture Photo
            </button>
          </div>
        )}

        {/* Hidden Canvas for Image Processing */}
        <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

        <button type="submit" className="submit-btn">Submit Report</button>
      </form>
    </div>
  );
};

export default CreateStaffReport;