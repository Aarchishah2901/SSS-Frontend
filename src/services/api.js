import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Register
export const registerUser = async (data) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  return res.json();
};


// Login
export const loginUser = async (data) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  return res.json();
};


//Job Requirement
export const postJobRequirement = async (data) => {
  const res = await fetch(`${API_URL}/job-requirements`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // includes cookies/JWT if any
    body: JSON.stringify(data),
  });
  return res.json();
};

// GET all Job Requirements
export const getAllJobRequirements = async () => {
  const res = await fetch(`${API_URL}/job-requirements`, {
    method: "GET",
    credentials: "include",
  });
  return res.json();
};

// POST Job Application (User applies for job)
export const submitJobApplication = async (data) => {
  const res = await fetch(`${API_URL}/job-applications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  return res.json();
};

// Get job application data
export const getjobapplicationdata = async (data) => {
  const res = await fetch(`${API_URL}/job-applications`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  return res.json();
}

//Selection
export const getAllSelections = async () => {
  return await axios.get(`${API_URL}/selections`);
};

export const updateSelectionStatus = async (id, status, message) => {
  return await axios.put(`${API_URL}/selections/${id}`, { status, message });
};

export const getUserSelectionStatus = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/selections/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// User Detail
export const createOrUpdateUserDetails = async (userId, data) => {
  try {
    return await axios.post(`${API_URL}/user-details/fill-details/${userId}`, data);
  } catch (err) {
    console.error("API CALL FAILED:", err.response?.status, err.response?.data);
    throw err;
  }
};

export const getUserDetails = async (userId) => {
  return await axios.get(`${API_URL}/user-details/get-details/${userId}`);
};

//User Profile Details
export const getJobApplicationData = async () => {
  const res = await fetch(`${API_URL}/job-applications`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  return res.json();
};