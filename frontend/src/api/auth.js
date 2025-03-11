import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/auth"; // Update if your backend URL is different

export const resetPassword = async (token, newPassword) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/reset-password/${token}`, {
      newPassword,
    });
    return response;
  } catch (error) {
    throw error;
  }
};