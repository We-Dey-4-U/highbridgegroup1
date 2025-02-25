import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EnergyInventoryList.css';

const EnergyInventoryList = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [updatedItem, setUpdatedItem] = useState({});

  useEffect(() => {
    axios
      .get('https://highbridgeapi.onrender.com/api/energy-inventory')
      .then((response) => {
        if (Array.isArray(response.data)) {
          const validItems = response.data.filter(item => item && item._id);
          setInventoryItems(validItems);
        } else {
          console.error('Unexpected API response:', response.data);
          setInventoryItems([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching inventory:', error);
        setInventoryItems([]);
      });
  }, []);

  const handleEditClick = (item) => {
    if (!item || !item._id) {
      console.error("Invalid item selected:", item);
      return;
    }
    setEditingItem(item._id);
    setUpdatedItem({ ...item });
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdatedItem((prev) => ({
      ...prev,
      [name]: ['qty', 'qtyIn', 'qtyOut', 'unitPrice'].includes(name) ? Number(value) : value,
    }));
  };

  const handleUpdateSubmit = (id) => {
    if (!id || !updatedItem || !updatedItem._id) {
      alert("Invalid item: missing ID");
      return;
    }
  
    axios
      .put(`https://highbridgeapi.onrender.com/api/energy-inventory/${id}`, updatedItem)
      .then((response) => {
        alert(response.data.message);
        setEditingItem(null);

        setInventoryItems(prev => {
          return prev.map(item => (item._id === id ? { ...item, ...updatedItem } : item));
        });
      })
      .catch((error) => {
        alert('Error updating item');
        console.error(error);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://highbridgeapi.onrender.com/api/energy-inventory/${id}`)
      .then((response) => {
        alert(response.data.message);
        setInventoryItems((prev) => prev.filter((item) => item._id !== id));
      })
      .catch((error) => {
        alert('Error deleting item');
        console.error(error);
      });
  };

  return (
    <div className="energy-inventory-list">
      <img src="/assets/images/logo/highbridge2.png" alt="Highbridge Homes Logo" className="logo" />
      <h2>Energy Store Inventory List</h2>
      <div className="inventory-table-wrapper">
        <table className="inventory-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Particulars</th>
              <th>Product Code</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Amount</th>
              <th>Quantity In</th>
              <th>Quantity Out</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventoryItems.length > 0 ? (
              inventoryItems.map((item, index) => (
                <tr key={item._id}>
                  {editingItem === item._id ? (
                    <>
                      <td>{index + 1}</td>
                      <td><input type="text" name="particulars" value={updatedItem.particulars || ''} onChange={handleUpdateChange} /></td>
                      <td><input type="text" name="productCode" value={updatedItem.productCode || ''} onChange={handleUpdateChange} /></td>
                      <td><input type="number" name="qty" value={updatedItem.qty || 0} onChange={handleUpdateChange} /></td>
                      <td><input type="number" name="unitPrice" value={updatedItem.unitPrice || 0} onChange={handleUpdateChange} /></td>
                      <td>{(updatedItem.qty || 0) * (updatedItem.unitPrice || 0)}</td>
                      <td><input type="number" name="qtyIn" value={updatedItem.qtyIn || 0} onChange={handleUpdateChange} /></td>
                      <td><input type="number" name="qtyOut" value={updatedItem.qtyOut || 0} onChange={handleUpdateChange} /></td>
                      <td>
                        <button onClick={() => handleUpdateSubmit(item._id)}>Save</button>
                        <button onClick={() => setEditingItem(null)}>Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{index + 1}</td>
                      <td>{item.particulars || 'N/A'}</td>
                      <td>{item.productCode || 'N/A'}</td>
                      <td>{item.qty || 0}</td>
                      <td>{item.unitPrice || 0}</td>
                      <td>{(item.qty || 0) * (item.unitPrice || 0)}</td>
                      <td>{item.qtyIn || 0}</td>
                      <td>{item.qtyOut || 0}</td>
                      <td>
                        <button onClick={() => handleEditClick(item)}>Edit</button>
                        <button onClick={() => handleDelete(item._id)}>Delete</button>
                      </td>
                    </>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9">No inventory items available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnergyInventoryList;