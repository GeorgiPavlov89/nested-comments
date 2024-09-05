import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:3001",
  withCredentials: true,
});

export async function makeRequest(url, options = {}) {
  try {
    const res = await api(url, options);
    return res.data;
  } catch (error) {
    console.error("API Request Error:", error);
    throw error.response?.data || error.message || "An error occurred";
  }
}
