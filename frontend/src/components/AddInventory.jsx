import React, { useState } from 'react';
import axios from 'axios';
import './AddInventory.css';

const AddInventory = () => {
  const [inventory, setInventory] = useState({
    no: '',
    particulars: '',
    productCode: '',
    qty: 0,
    unitPrice: '', // Allow unitPrice to be empty
    qtyOut: 0,
    qtyIn: 0,
  });

  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInventory((prevInventory) => ({
      ...prevInventory,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation (unitPrice is now optional)
    if (!inventory.no || !inventory.particulars || !inventory.productCode || inventory.qty <= 0 || inventory.qtyIn < 0 || inventory.qtyOut < 0) {
      console.error("Validation failed: Some fields are missing or invalid");
      alert("Please fill all required fields correctly.");
      return;
    }

    // Convert unitPrice to null if empty wire
    const submissionData = {
      ...inventory,
      unitPrice: inventory.unitPrice === '' ? null : inventory.unitPrice, 
    };

    console.log("Submitting inventory data:", submissionData);

    axios
      .post('http://localhost:5000/api/energy-inventory', submissionData)
      .then((response) => {
        console.log("Response from API:", response.data);
        alert(response.data.message);
        
        setSubmissionStatus('success');
        setInventory({
          no: '',
          particulars: '',
          productCode: '',
          qty: 0,
          unitPrice: '',
          qtyOut: 0,
          qtyIn: 0,
        });
      })
      .catch((error) => {
        console.error("Error occurred during the request:", error);
        if (error.response) {
          console.error("Server error response:", error.response.data);
          alert(`Error: ${error.response.data.message || 'An error occurred on the server'}`);
        } else if (error.request) {
          alert("Error: No response from server. Please check your connection or try again later.");
        } else {
          alert(`Error: ${error.message}`);
        }

        setSubmissionStatus('error');
      });
  };

  return (
    <div className="add-inventory-container">
      <img src="/assets/images/logo/highbridge2.png" alt="Highbridge Homes Logo" className="logo" />
      <h2>Add New Inventory Item</h2>
      
      {submissionStatus === 'success' && <div className="success-message">Inventory item added successfully!</div>}
      {submissionStatus === 'error' && <div className="error-message">There was an error submitting the form. Please try again.</div>}
      
      <form onSubmit={handleSubmit} className="inventory-form">
        <label>No:
          <input type="number" name="no" value={inventory.no} onChange={handleChange} required />
        </label>

        <label>Particulars:
          <input type="text" name="particulars" value={inventory.particulars} onChange={handleChange} required />
        </label>

        <label>Product Code:
          <input type="text" name="productCode" value={inventory.productCode} onChange={handleChange} required />
        </label>

        <label>Quantity:
          <input type="number" name="qty" value={inventory.qty} onChange={handleChange} required />
        </label>

        <label>Unit Price:  
          <input type="number" name="unitPrice" value={inventory.unitPrice} onChange={handleChange} />
        </label>

        <label>Quantity In:
          <input type="number" name="qtyIn" value={inventory.qtyIn} onChange={handleChange} required />
        </label>

        <label>Quantity Out:
          <input type="number" name="qtyOut" value={inventory.qtyOut} onChange={handleChange} required />
        </label>

        <button type="submit" className="submit-btn">Add Inventory</button>
      </form>
    </div>
  );
};

export default AddInventory;